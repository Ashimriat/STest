import express from 'express';
import expressWs from 'express-ws';
import fs from 'fs';
import crypto from 'crypto';
import path from 'path';
import { generateExchangeRates, generateCoupon } from './utils';
import config from './config';
import MESSAGES from '../messages';


let filesSent = [];
const VIDEO_FILE_REGEXP = /.+(\.(mp4))$/;

const getData = fileName => {
	const pathToFile = path.join('.', 'assets', fileName);
	const fileStream = fs.createReadStream(pathToFile);
	const hash = crypto.createHash('sha1');
	hash.setEncoding('hex');
	return new Promise(resolve => {
		fileStream.on('end', () => {
			hash.end();
			const res = {
				name: fileName,
				hash: hash.read()
			};
			resolve(res);
		});
		fileStream.pipe(hash);
	});
};
/**
 * @function isOnlyAlreadySentFiles
 * @description определяет, есть ли среди файлов на отправку новые
 * @param {Array} newFiles - массив файлов для отправки
 * @return {Boolean}
 */
const isOnlyAlreadySentFiles = (newFiles) => {
	if (filesSent.length !== newFiles.length) {
		return false;
	}
	let sameFilesAmount = 0;
	newFiles.forEach(({ hash: newFileHash }) => {
		const sameHashFile = filesSent.find(({ hash: oldFileHash }) => newFileHash === oldFileHash);
		if (sameHashFile) sameFilesAmount += 1;
	});
	return sameFilesAmount === filesSent.length;
};



/**
 * @function getUniqueFiles
 * @description вспомогательная функция, помогающая отсеять одинаковые файлы с разными именами
 * путем сверки кэша контента
 * @param {Array} arr - массив с именами и хэшами файлов
 * @return {Array} массив из уникальных файлов
 */
const getUniqueFiles = arr => {
	const res = [];
	for (let i = 0; i < arr.length; i++) {
		if (
			!i
			|| !(arr[i].hash === arr[i - 1].hash)
		) res.push(arr[i])
	}
	return res;
};
const getFilesForSend = async () => {
	const data = [];
	return new Promise(resolve => {
		fs.readdir(path.join('.', 'assets'), (err, files) => {
			const fittingFiles = [];
			// отбираем все видеофайлы, игнорируя остальные
			for (let fileName of files) {
				if (!fileName.match(VIDEO_FILE_REGEXP)) continue;
				fittingFiles.push(fileName);
			}
			const processFilesData = () => {
				if (data.length !== fittingFiles.length) {
					setTimeout(processFilesData, 1000);
					return;
				}
				const uniqueFiles = getUniqueFiles(data);
				if (isOnlyAlreadySentFiles(uniqueFiles)) resolve([]);
				filesSent = [...uniqueFiles];
				resolve(filesSent);
			};
			fittingFiles.forEach(async fileName => {
				const fileData = await getData(fileName);
				data.push(fileData);
				if (fileName === fittingFiles[fittingFiles.length - 1]) processFilesData();
			});
		});
	});
};


const appServer = express();
expressWs(appServer);
appServer.ws('/', (ws, req, next) => {
  setInterval(() => {
    ws.send(JSON.stringify({
      type: MESSAGES.UPDATE_COUPONS,
      data: generateCoupon()
    }));
  }, config.couponsRefreshTime);
  setInterval(() => {
    ws.send(JSON.stringify({
      type: MESSAGES.UPDATE_RATES,
      data: generateExchangeRates()
    }));
  }, config.ratesRefreshTime);
  const sendVideoFiles = async () => {
	  const videoFiles = await getFilesForSend();
	  if (!videoFiles.length) return;
	  console.log('FILES FOR SEND', videoFiles);
	  ws.send(JSON.stringify({type: MESSAGES.CLEAR_VIDEOS}), {}, () => {
		  const videosData = videoFiles.map(({name: fileName}) => fs.readFileSync(`./assets/${fileName}`));
		  videosData.forEach((dataPiece, index) => {
			  ws.send(dataPiece);
			  ws.send(JSON.stringify({
				  type: MESSAGES.ADD_VIDEO_INFO,
				  data: videoFiles[index]
			  }));
		  });
	  });
  };
  sendVideoFiles()
		.then(() => setInterval(sendVideoFiles, config.videoRefreshTime));
});
appServer.listen(3000, () => console.log('Listening to port 3000.'));

