const { get } = require("jquery");
const { default: erpObject } = require("./erp-objects");

openDb1 = function (dbName) {
  return new Promise((resolve, reject) => {
    let dbReq = indexedDB.open(dbName, 1);
    //localStorage.setItem("vs1Db", dbName)

    dbReq.onsuccess = () => resolve(dbReq.result);

    dbReq.onupgradeneeded = function (event) {
      let db = event.target.result;
    };

    dbReq.onerror = (event) => reject(new Error("Failed to open DB"));
  });
};

openDb2 = function () {
  return new Promise((resolve, reject) => {
    let dbReq = indexedDB.open("TDatabase", 1);
    dbReq.onsuccess = () => resolve(dbReq.result);

    dbReq.onupgradeneeded = function (event) {
      let db = event.target.result;
      db.createObjectStore("TDatabases", { keyPath: "EmployeeEmail" });
    };
  });
};

openDb = function (dbName) {
  return new Promise((resolve, reject) => {
    let dbReq = indexedDB.open(dbName, 1);

    dbReq.onsuccess = () => resolve(dbReq.result);

    dbReq.onupgradeneeded = function (event) {
      let db = event.target.result;

      db.createObjectStore("TSerialNumberListCurrentReport", {
        keyPath: "EmployeeEmail",
      });
    };
    dbReq.onerror = (event) => reject(new Error("Failed to open DB"));
  });
};

storeExists = function (objectStore, Email) {
  var promise = new Promise((resolve, reject) => {
    var exists = false;
    var objectStoreRequest = objectStore.get(Email);
    objectStoreRequest.onsuccess = function () {
      if (objectStoreRequest.result) {
        if (Email == objectStoreRequest.result.EmployeeEmail) {
          localStorage.setItem("vs1Db", objectStoreRequest.result.data);
          exists = true;
          resolve(exists);
        }
      } else {
        exists = false;
        resolve(exists);
      }
    };
  });
  return promise;
};

addLoginData = async function (loginData) {
  const db = await openDb(loginData.ProcessLog.DatabaseName);
  const db1 = await openDb2();
  let transaction1 = await db1.transaction(["TDatabases"], "readwrite");
  let transaction = await db.transaction(["vscloudlogininfo"], "readwrite");
  localStorage.setItem("vs1Db", loginData.ProcessLog.DatabaseName);

  transaction.oncomplete = function (event) {};

  transaction1.oncomplete = function (event) {};
  localStorage.setItem(
    "vs1EmployeeName",
    loginData.ProcessLog.VS1UserName || loginData.ProcessLog.VS1AdminUserName
  );
  let loginInfo = {
    EmployeeEmail:
      loginData.ProcessLog.VS1UserName || loginData.ProcessLog.VS1AdminUserName,
    data: loginData,
  };

  let dbInfo = {
    EmployeeEmail:
      loginData.ProcessLog.VS1UserName || loginData.ProcessLog.VS1AdminUserName,
    data: loginData.ProcessLog.DatabaseName,
  };

  let dbObjectStore = transaction1.objectStore("TDatabases");
  let objectStore = transaction.objectStore("vscloudlogininfo");

  dbObjectStore.add(dbInfo);
  objectStore.put(loginInfo);
};

addVS1Data = async function (objectName, vs1Data) {
  const db = await openDb(localStorage.getItem("vs1Db"));
  //const db1 = await openDb2();
  //let transaction1 = await db1.transaction(["TDatabases"], "readwrite")
  let transaction = await db.transaction([objectName], "readwrite");

  transaction.oncomplete = function (event) {};
  let currentDate = new Date();
  let hours = currentDate.getHours(); //returns 0-23
  let minutes = currentDate.getMinutes(); //returns 0-59
  let seconds = currentDate.getSeconds(); //returns 0-59
  let month = currentDate.getMonth() + 1;
  let days = currentDate.getDate();

  if (currentDate.getMonth() + 1 < 10) {
    month = "0" + (currentDate.getMonth() + 1);
  }

  if (currentDate.getDate() < 10) {
    days = "0" + currentDate.getDate();
  }

  if (currentDate.getHours() < 10) {
    hours = "0" + currentDate.getHours();
  }

  if (currentDate.getMinutes() < 10) {
    minutes = "0" + currentDate.getMinutes();
  }
  if (currentDate.getSeconds() < 10) {
    seconds = "0" + currentDate.getSeconds();
  }
  let currenctUpdateDate =
    currentDate.getFullYear() +
    "-" +
    month +
    "-" +
    days +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;
  let loginInfo = {
    EmployeeEmail: localStorage.getItem("vs1EmployeeName"),
    data: vs1Data,
    timestamp: currenctUpdateDate,
  };
  let objectStore = transaction.objectStore(objectName);
  objectStore.put(loginInfo);
};

clearData = async function (objectName) {
  // open a read/write db transaction, ready for clearing the data
  const db = await openDb(localStorage.getItem("vs1Db"));
  const transaction = await db.transaction([objectName], "readwrite");

  // report on the success of the transaction completing, when everything is done
  transaction.oncomplete = function (event) {};

  transaction.onerror = function (event) {};

  // create an object store on the transaction
  const objectStore = transaction.objectStore(objectName);

  // Make a request to clear all the data out of the object store
  const objectStoreRequest = objectStore.clear();

  objectStoreRequest.onsuccess = function (event) {
    // report the success of our request
  };
};

queryLoginDataObject = function (objectStore, VS1AdminUserName) {
  var promise = new Promise((resolve, reject) => {
    let results = objectStore.openCursor();
    let data = [];
    results.onerror = () => reject();
    results.onsuccess = (event) => {
      let cursor = event.target.result;
      if (cursor) {
        if (VS1AdminUserName == cursor.key) {
          data.push(cursor.value);
          // if(!data){
          //     reject('');
          // }
        }
        cursor.continue();
      } else {
        if (data) {
          resolve(data);
        }
      }
    };
  });
  return promise;
};

getLoginData = async function (email) {
  const db = await openDb(localStorage.getItem("vs1Db"));
  const transaction = await db.transaction(["vscloudlogininfo"]);
  const objectStore = await transaction.objectStore("vscloudlogininfo");
  return await queryLoginDataObject(objectStore, email);
};

queryVS1DataObject = function (objectStore, VS1AdminUserName) {
  var promise = new Promise((resolve, reject) => {
    let results = objectStore.openCursor();
    let data = [];

    results.onerror = () => reject();
    results.onsuccess = (event) => {
      let cursor = event.target.result;
      if (cursor) {
        if (VS1AdminUserName === cursor.key) {
          data.push(cursor.value);
        }
        cursor.continue();
      } else {
        if (data) {
          resolve(data);
        }
      }
    };
  });
  return promise;
};

getVS1Data = async function (objectData) {
  const db = await openDb(localStorage.getItem("vs1Db"));

  const transaction = await db.transaction([objectData]);
  const objectStore = await transaction.objectStore(objectData);
  return await queryVS1DataObject(
    objectStore,
    localStorage.getItem("vs1EmployeeName")
  );
};

storeExists1 = async function (email) {
  const db = await openDb2("TDatabase");
  const transaction = await db.transaction(["TDatabases"]);
  const objectStore = await transaction.objectStore("TDatabases");
  return await storeExists(objectStore, email);
};

deleteStoreExists = function (objectStore, Email) {
  var promise = new Promise((resolve, reject) => {
    var exists = false;
    var objectStoreRequest = objectStore.get(Email);
    objectStoreRequest.onsuccess = function () {
      if (objectStoreRequest.result) {
        if (Email === objectStoreRequest.result.EmployeeEmail) {
          let databaseName = objectStoreRequest.result.data;
          var req = indexedDB.deleteDatabase(databaseName);
          // var req2Deltransaction = objectStore.transaction(["TDatabases"], "readwrite");
          var req2Del = objectStore.delete(Email);
          req.onsuccess = function () {
            req2Del.onsuccess = function () {
              exists = true;
              resolve(exists);
            };
          };
          req.onerror = function () {
            exists = false;
            resolve(exists);
          };
          req.onblocked = function () {
            exists = false;
            resolve(exists);
          };
        }
      } else {
        exists = false;
        resolve(exists);
      }
    };
  });
  return promise;
};

deleteStoreDatabase = async function (databaseName) {
  var req = window.indexedDB
    .databases()
    .then((r) => {
      for (var i = 0; i < r.length; i++) {
        window.indexedDB.deleteDatabase(r[i].name);
      }
    })
    .then(() => {});
  return await req;
};

getStoreToDelete = async function (email) {
  const db = await openDb2("TDatabase");
  const transaction = await db.transaction(["TDatabases"], "readwrite");
  const objectStore = await transaction.objectStore("TDatabases");
  return await deleteStoreExists(objectStore, email);
};

openDbCheckVersion = async function () {
  var promiseversion = new Promise((resolve, reject) => {
    var versionExists = false;
    let dbReqVersion = indexedDB.open("TDatabaseVersion", 260);
    dbReqVersion.onsuccess = function () {
      resolve(versionExists);
    };
    dbReqVersion.onupgradeneeded = function (event) {
      let dbVersion = event.target.result;
      if (event.oldVersion != 0) {
        if (event.oldVersion != event.newVersion) {
          versionExists = true;
          resolve(versionExists);
        } else {
          versionExists = false;
          resolve(versionExists);
        }
      } else {
        versionExists = true;
        resolve(versionExists);
      }
      //dbReqVersion.createObjectStore("TDatabaseVersion", { keyPath: "EmployeeEmail" });
    };
  });
  return promiseversion;
};
