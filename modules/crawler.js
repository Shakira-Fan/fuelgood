const request = require("request");
const cheerio = require("cheerio");

//存入雲端
const mongoose = require("mongoose");
const HistoryData = require("../models/historyData-model");

module.exports = {
  crawHistoryData: getHistoryData,
  crawRecentData: getRecentData,
};

async function getHistoryData() {
  request(
    {
      url: "https://www.findcar.com.tw/oil.aspx",
      method: "GET",
    },
    async (error, res, body) => {
      // 如果有錯誤訊息，或沒有 body(內容)，就 return
      if (error || !body) {
        return;
      }

      const HistoryData = [];
      const $ = await cheerio.load(body); // 載入 body
      const list = await $("#divOilList");
      let gasoline = "";
      let price = "";
      let appliedDate = "";

      for (let j = 4; j < 17; j++) {
        price = list.eq(0).find(`tr:nth-child(${j}) td:nth-child(2)`).text();
        appliedDate = list
          .eq(0)
          .find(`tr:nth-child(${j}) td:nth-child(1)`)
          .text();
        gasoline = list.eq(0).find(`tr:nth-child(1) th:nth-child(2)`).text();
        saveHistoryData(gasoline, appliedDate, price);
      }

      for (let j = 4; j < 17; j++) {
        price = list.eq(0).find(`tr:nth-child(${j}) td:nth-child(4)`).text();
        appliedDate = list
          .eq(0)
          .find(`tr:nth-child(${j}) td:nth-child(1)`)
          .text();
        gasoline = list.eq(0).find(`tr:nth-child(1) th:nth-child(3)`).text();
        saveHistoryData(gasoline, appliedDate, price);
      }

      for (let j = 4; j < 17; j++) {
        price = list.eq(0).find(`tr:nth-child(${j}) td:nth-child(6)`).text();
        appliedDate = list
          .eq(0)
          .find(`tr:nth-child(${j}) td:nth-child(1)`)
          .text();
        gasoline = list.eq(0).find(`tr:nth-child(1) th:nth-child(4)`).text();
        saveHistoryData(gasoline, appliedDate, price);
      }

      for (let j = 4; j < 17; j++) {
        price = list.eq(0).find(`tr:nth-child(${j}) td:nth-child(8)`).text();
        appliedDate = list
          .eq(0)
          .find(`tr:nth-child(${j}) td:nth-child(1)`)
          .text();
        gasoline = list.eq(0).find(`tr:nth-child(1) th:nth-child(5)`).text();
        saveHistoryData(gasoline, appliedDate, price);
      }
    }
  );
}

async function getRecentData() {
  request(
    {
      url: "https://www.findcar.com.tw/oil.aspx",
      method: "GET",
    },
    async (error, res, body) => {
      // 如果有錯誤訊息，或沒有 body(內容)，就 return
      if (error || !body) {
        return;
      }

      const HistoryData = [];
      const $ = await cheerio.load(body); // 載入 body
      const list = await $("#divOilList");
      let gasoline = "";
      let price = "";
      let appliedDate = "";

      for (let j = 3; j < 4; j++) {
        price = list.eq(0).find(`tr:nth-child(${j}) td:nth-child(2)`).text();
        appliedDate = list
          .eq(0)
          .find(`tr:nth-child(${j}) td:nth-child(1)`)
          .text();
        gasoline = list.eq(0).find(`tr:nth-child(1) th:nth-child(2)`).text();

        saveHistoryData(gasoline, appliedDate, price);
      }

      for (let j = 3; j < 4; j++) {
        price = list.eq(0).find(`tr:nth-child(${j}) td:nth-child(4)`).text();
        appliedDate = list
          .eq(0)
          .find(`tr:nth-child(${j}) td:nth-child(1)`)
          .text();
        gasoline = list.eq(0).find(`tr:nth-child(1) th:nth-child(3)`).text();

        saveHistoryData(gasoline, appliedDate, price);
      }

      for (let j = 3; j < 4; j++) {
        price = list.eq(0).find(`tr:nth-child(${j}) td:nth-child(6)`).text();
        appliedDate = list
          .eq(0)
          .find(`tr:nth-child(${j}) td:nth-child(1)`)
          .text();
        gasoline = list.eq(0).find(`tr:nth-child(1) th:nth-child(4)`).text();

        saveHistoryData(gasoline, appliedDate, price);
      }

      for (let j = 3; j < 4; j++) {
        price = list.eq(0).find(`tr:nth-child(${j}) td:nth-child(8)`).text();
        appliedDate = list
          .eq(0)
          .find(`tr:nth-child(${j}) td:nth-child(1)`)
          .text();
        gasoline = list.eq(0).find(`tr:nth-child(1) th:nth-child(5)`).text();

        saveHistoryData( gasoline, appliedDate, price );
      }
    }
  );
}

async function saveHistoryData(gas, date, price) {
  let newHistoryData = new HistoryData({
    gasoline: gas,
    appliedDate: date,
    price: price,
  });
  await newHistoryData
    .save()
    .then(() => {
      console.log(`Data has been saved`);
    })
    .catch((e) => {
      console.log(e);
      console.log(`Data is not accepted.`);
    });
}
