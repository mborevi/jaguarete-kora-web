
var Module;

if (typeof Module === 'undefined') Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');

if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {
 var loadPackage = function(metadata) {

  var PACKAGE_PATH;
  if (typeof window === 'object') {
    PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
  } else if (typeof location !== 'undefined') {
      // worker
      PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
    } else {
      throw 'using preloaded data can only be done on a web page or in a web worker';
    }
    var PACKAGE_NAME = 'game.data';
    var REMOTE_PACKAGE_BASE = 'game.data';
    if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
      Module['locateFile'] = Module['locateFilePackage'];
      Module.printErr('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
    }
    var REMOTE_PACKAGE_NAME = typeof Module['locateFile'] === 'function' ?
    Module['locateFile'](REMOTE_PACKAGE_BASE) :
    ((Module['filePackagePrefixURL'] || '') + REMOTE_PACKAGE_BASE);

    var REMOTE_PACKAGE_SIZE = metadata.remote_package_size;
    var PACKAGE_UUID = metadata.package_uuid;

    function fetchRemotePackage(packageName, packageSize, callback, errback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', packageName, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = function(event) {
        var url = packageName;
        var size = packageSize;
        if (event.total) size = event.total;
        if (event.loaded) {
          if (!xhr.addedTotal) {
            xhr.addedTotal = true;
            if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
            Module.dataFileDownloads[url] = {
              loaded: event.loaded,
              total: size
            };
          } else {
            Module.dataFileDownloads[url].loaded = event.loaded;
          }
          var total = 0;
          var loaded = 0;
          var num = 0;
          for (var download in Module.dataFileDownloads) {
            var data = Module.dataFileDownloads[download];
            total += data.total;
            loaded += data.loaded;
            num++;
          }
          total = Math.ceil(total * Module.expectedDataFileDownloads/num);
          if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
        } else if (!Module.dataFileDownloads) {
          if (Module['setStatus']) Module['setStatus']('Downloading data...');
        }
      };
      xhr.onerror = function(event) {
        throw new Error("NetworkError for: " + packageName);
      }
      xhr.onload = function(event) {
        if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
          var packageData = xhr.response;
          callback(packageData);
        } else {
          throw new Error(xhr.statusText + " : " + xhr.responseURL);
        }
      };
      xhr.send(null);
    };

    function handleError(error) {
      console.error('package error:', error);
    };

    function runWithFS() {

      function assert(check, msg) {
        if (!check) throw msg + new Error().stack;
      }
      Module['FS_createPath']('/', '.git', true, true);
      Module['FS_createPath']('/.git', 'hooks', true, true);
      Module['FS_createPath']('/.git', 'info', true, true);
      Module['FS_createPath']('/.git', 'logs', true, true);
      Module['FS_createPath']('/.git/logs', 'refs', true, true);
      Module['FS_createPath']('/.git/logs/refs', 'heads', true, true);
      Module['FS_createPath']('/.git/logs/refs', 'remotes', true, true);
      Module['FS_createPath']('/.git/logs/refs/remotes', 'origin', true, true);
      Module['FS_createPath']('/.git', 'objects', true, true);
      Module['FS_createPath']('/.git/objects', '01', true, true);
      Module['FS_createPath']('/.git/objects', '0c', true, true);
      Module['FS_createPath']('/.git/objects', '0e', true, true);
      Module['FS_createPath']('/.git/objects', '1f', true, true);
      Module['FS_createPath']('/.git/objects', '29', true, true);
      Module['FS_createPath']('/.git/objects', '40', true, true);
      Module['FS_createPath']('/.git/objects', '4d', true, true);
      Module['FS_createPath']('/.git/objects', '5e', true, true);
      Module['FS_createPath']('/.git/objects', '67', true, true);
      Module['FS_createPath']('/.git/objects', '6b', true, true);
      Module['FS_createPath']('/.git/objects', '6c', true, true);
      Module['FS_createPath']('/.git/objects', '75', true, true);
      Module['FS_createPath']('/.git/objects', '7b', true, true);
      Module['FS_createPath']('/.git/objects', '81', true, true);
      Module['FS_createPath']('/.git/objects', '8b', true, true);
      Module['FS_createPath']('/.git/objects', '8e', true, true);
      Module['FS_createPath']('/.git/objects', '96', true, true);
      Module['FS_createPath']('/.git/objects', '98', true, true);
      Module['FS_createPath']('/.git/objects', '9b', true, true);
      Module['FS_createPath']('/.git/objects', 'a1', true, true);
      Module['FS_createPath']('/.git/objects', 'af', true, true);
      Module['FS_createPath']('/.git/objects', 'b4', true, true);
      Module['FS_createPath']('/.git/objects', 'b7', true, true);
      Module['FS_createPath']('/.git/objects', 'b8', true, true);
      Module['FS_createPath']('/.git/objects', 'bb', true, true);
      Module['FS_createPath']('/.git/objects', 'd3', true, true);
      Module['FS_createPath']('/.git/objects', 'd8', true, true);
      Module['FS_createPath']('/.git/objects', 'e4', true, true);
      Module['FS_createPath']('/.git/objects', 'ea', true, true);
      Module['FS_createPath']('/.git/objects', 'f8', true, true);
      Module['FS_createPath']('/.git/objects', 'f9', true, true);
      Module['FS_createPath']('/.git/objects', 'info', true, true);
      Module['FS_createPath']('/.git/objects', 'pack', true, true);
      Module['FS_createPath']('/.git', 'refs', true, true);
      Module['FS_createPath']('/.git/refs', 'heads', true, true);
      Module['FS_createPath']('/.git/refs', 'remotes', true, true);
      Module['FS_createPath']('/.git/refs/remotes', 'origin', true, true);
      Module['FS_createPath']('/.git/refs', 'tags', true, true);

      function DataRequest(start, end, crunched, audio) {
        this.start = start;
        this.end = end;
        this.crunched = crunched;
        this.audio = audio;
      }
      DataRequest.prototype = {
        requests: {},
        open: function(mode, name) {
          this.name = name;
          this.requests[name] = this;
          Module['addRunDependency']('fp ' + this.name);
        },
        send: function() {},
        onload: function() {
          var byteArray = this.byteArray.subarray(this.start, this.end);

          this.finish(byteArray);

        },
        finish: function(byteArray) {
          var that = this;

        Module['FS_createDataFile'](this.name, null, byteArray, true, true, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
        Module['removeRunDependency']('fp ' + that.name);

        this.requests[this.name] = null;
      }
    };

    var files = metadata.files;
    for (i = 0; i < files.length; ++i) {
      new DataRequest(files[i].start, files[i].end, files[i].crunched, files[i].audio).open('GET', files[i].filename);
    }


    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    var IDB_RO = "readonly";
    var IDB_RW = "readwrite";
    var DB_NAME = "EM_PRELOAD_CACHE";
    var DB_VERSION = 1;
    var METADATA_STORE_NAME = 'METADATA';
    var PACKAGE_STORE_NAME = 'PACKAGES';
    function openDatabase(callback, errback) {
      try {
        var openRequest = indexedDB.open(DB_NAME, DB_VERSION);
      } catch (e) {
        return errback(e);
      }
      openRequest.onupgradeneeded = function(event) {
        var db = event.target.result;

        if(db.objectStoreNames.contains(PACKAGE_STORE_NAME)) {
          db.deleteObjectStore(PACKAGE_STORE_NAME);
        }
        var packages = db.createObjectStore(PACKAGE_STORE_NAME);

        if(db.objectStoreNames.contains(METADATA_STORE_NAME)) {
          db.deleteObjectStore(METADATA_STORE_NAME);
        }
        var metadata = db.createObjectStore(METADATA_STORE_NAME);
      };
      openRequest.onsuccess = function(event) {
        var db = event.target.result;
        callback(db);
      };
      openRequest.onerror = function(error) {
        errback(error);
      };
    };

    /* Check if there's a cached package, and if so whether it's the latest available */
    function checkCachedPackage(db, packageName, callback, errback) {
      var transaction = db.transaction([METADATA_STORE_NAME], IDB_RO);
      var metadata = transaction.objectStore(METADATA_STORE_NAME);

      var getRequest = metadata.get("metadata/" + packageName);
      getRequest.onsuccess = function(event) {
        var result = event.target.result;
        if (!result) {
          return callback(false);
        } else {
          return callback(PACKAGE_UUID === result.uuid);
        }
      };
      getRequest.onerror = function(error) {
        errback(error);
      };
    };

    function fetchCachedPackage(db, packageName, callback, errback) {
      var transaction = db.transaction([PACKAGE_STORE_NAME], IDB_RO);
      var packages = transaction.objectStore(PACKAGE_STORE_NAME);

      var getRequest = packages.get("package/" + packageName);
      getRequest.onsuccess = function(event) {
        var result = event.target.result;
        callback(result);
      };
      getRequest.onerror = function(error) {
        errback(error);
      };
    };

    function cacheRemotePackage(db, packageName, packageData, packageMeta, callback, errback) {
      var transaction_packages = db.transaction([PACKAGE_STORE_NAME], IDB_RW);
      var packages = transaction_packages.objectStore(PACKAGE_STORE_NAME);

      var putPackageRequest = packages.put(packageData, "package/" + packageName);
      putPackageRequest.onsuccess = function(event) {
        var transaction_metadata = db.transaction([METADATA_STORE_NAME], IDB_RW);
        var metadata = transaction_metadata.objectStore(METADATA_STORE_NAME);
        var putMetadataRequest = metadata.put(packageMeta, "metadata/" + packageName);
        putMetadataRequest.onsuccess = function(event) {
          callback(packageData);
        };
        putMetadataRequest.onerror = function(error) {
          errback(error);
        };
      };
      putPackageRequest.onerror = function(error) {
        errback(error);
      };
    };

    function processPackageData(arrayBuffer) {
      Module.finishedDataFileDownloads++;
      assert(arrayBuffer, 'Loading data file failed.');
      assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
      var byteArray = new Uint8Array(arrayBuffer);
      var curr;

        // copy the entire loaded file into a spot in the heap. Files will refer to slices in that. They cannot be freed though
        // (we may be allocating before malloc is ready, during startup).
        if (Module['SPLIT_MEMORY']) Module.printErr('warning: you should run the file packager with --no-heap-copy when SPLIT_MEMORY is used, otherwise copying into the heap may fail due to the splitting');
        var ptr = Module['getMemory'](byteArray.length);
        Module['HEAPU8'].set(byteArray, ptr);
        DataRequest.prototype.byteArray = Module['HEAPU8'].subarray(ptr, ptr+byteArray.length);

        var files = metadata.files;
        for (i = 0; i < files.length; ++i) {
          DataRequest.prototype.requests[files[i].filename].onload();
        }
        Module['removeRunDependency']('datafile_game.data');

      };
      Module['addRunDependency']('datafile_game.data');

      if (!Module.preloadResults) Module.preloadResults = {};

      function preloadFallback(error) {
        console.error(error);
        console.error('falling back to default preload behavior');
        fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, processPackageData, handleError);
      };

      openDatabase(
        function(db) {
          checkCachedPackage(db, PACKAGE_PATH + PACKAGE_NAME,
            function(useCached) {
              Module.preloadResults[PACKAGE_NAME] = {fromCache: useCached};
              if (useCached) {
                console.info('loading ' + PACKAGE_NAME + ' from cache');
                fetchCachedPackage(db, PACKAGE_PATH + PACKAGE_NAME, processPackageData, preloadFallback);
              } else {
                console.info('loading ' + PACKAGE_NAME + ' from remote');
                fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE,
                  function(packageData) {
                    cacheRemotePackage(db, PACKAGE_PATH + PACKAGE_NAME, packageData, {uuid:PACKAGE_UUID}, processPackageData,
                      function(error) {
                        console.error(error);
                        processPackageData(packageData);
                      });
                  }
                  , preloadFallback);
              }
            }
            , preloadFallback);
        }
        , preloadFallback);

      if (Module['setStatus']) Module['setStatus']('Downloading...');

    }
    if (Module['calledRun']) {
      runWithFS();
    } else {
      if (!Module['preRun']) Module['preRun'] = [];
      Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
    }

  }
  loadPackage({"package_uuid":"bb918773-c35f-4caf-8c9b-945fd79b0e67","remote_package_size":129625,"files":[{"filename":"/.DS_Store","crunched":0,"start":0,"end":6148,"audio":false},{"filename":"/.git/COMMIT_EDITMSG","crunched":0,"start":6148,"end":6159,"audio":false},{"filename":"/.git/HEAD","crunched":0,"start":6159,"end":6180,"audio":false},{"filename":"/.git/config","crunched":0,"start":6180,"end":6491,"audio":false},{"filename":"/.git/description","crunched":0,"start":6491,"end":6564,"audio":false},{"filename":"/.git/hooks/applypatch-msg.sample","crunched":0,"start":6564,"end":7042,"audio":false},{"filename":"/.git/hooks/commit-msg.sample","crunched":0,"start":7042,"end":7938,"audio":false},{"filename":"/.git/hooks/fsmonitor-watchman.sample","crunched":0,"start":7938,"end":12593,"audio":false},{"filename":"/.git/hooks/post-update.sample","crunched":0,"start":12593,"end":12782,"audio":false},{"filename":"/.git/hooks/pre-applypatch.sample","crunched":0,"start":12782,"end":13206,"audio":false},{"filename":"/.git/hooks/pre-commit.sample","crunched":0,"start":13206,"end":14849,"audio":false},{"filename":"/.git/hooks/pre-merge-commit.sample","crunched":0,"start":14849,"end":15265,"audio":false},{"filename":"/.git/hooks/pre-push.sample","crunched":0,"start":15265,"end":16639,"audio":false},{"filename":"/.git/hooks/pre-rebase.sample","crunched":0,"start":16639,"end":21537,"audio":false},{"filename":"/.git/hooks/pre-receive.sample","crunched":0,"start":21537,"end":22081,"audio":false},{"filename":"/.git/hooks/prepare-commit-msg.sample","crunched":0,"start":22081,"end":23573,"audio":false},{"filename":"/.git/hooks/push-to-checkout.sample","crunched":0,"start":23573,"end":26356,"audio":false},{"filename":"/.git/hooks/update.sample","crunched":0,"start":26356,"end":30006,"audio":false},{"filename":"/.git/index","crunched":0,"start":30006,"end":30431,"audio":false},{"filename":"/.git/info/exclude","crunched":0,"start":30431,"end":30671,"audio":false},{"filename":"/.git/logs/HEAD","crunched":0,"start":30671,"end":32272,"audio":false},{"filename":"/.git/logs/refs/heads/main","crunched":0,"start":32272,"end":33873,"audio":false},{"filename":"/.git/logs/refs/remotes/origin/HEAD","crunched":0,"start":33873,"end":34062,"audio":false},{"filename":"/.git/logs/refs/remotes/origin/main","crunched":0,"start":34062,"end":35230,"audio":false},{"filename":"/.git/objects/01/a65c897839d39aa5323b5bdf3bab51fcceaa67","crunched":0,"start":35230,"end":35866,"audio":false},{"filename":"/.git/objects/0c/4761d31714f02f2cec0c8010b2d7fa18871a88","crunched":0,"start":35866,"end":36696,"audio":false},{"filename":"/.git/objects/0e/3140ec39b67eaf9291fec6349902c842bd20b5","crunched":0,"start":36696,"end":36851,"audio":false},{"filename":"/.git/objects/0e/7be5caecb37aba310d7079dfdf1777a05b5720","crunched":0,"start":36851,"end":37018,"audio":false},{"filename":"/.git/objects/1f/336843c790ded7cd05364e1b4b7b2751c402d1","crunched":0,"start":37018,"end":37184,"audio":false},{"filename":"/.git/objects/29/9166c9c5471de3388df30be398423e42dcc716","crunched":0,"start":37184,"end":37346,"audio":false},{"filename":"/.git/objects/40/916d60e81ffa8c8e1052f03f19829be4c877d7","crunched":0,"start":37346,"end":37746,"audio":false},{"filename":"/.git/objects/4d/d64c563f42a3a9e8c51684fe0367a425c90c6c","crunched":0,"start":37746,"end":37902,"audio":false},{"filename":"/.git/objects/5e/c158348a553718b1078b044cc43332975c9ab1","crunched":0,"start":37902,"end":38069,"audio":false},{"filename":"/.git/objects/67/0be608db2f80f78bb7ac20071ef5b0c86563b8","crunched":0,"start":38069,"end":38235,"audio":false},{"filename":"/.git/objects/6b/65f16d717883b9cced056d51fb4d989a7cf919","crunched":0,"start":38235,"end":38402,"audio":false},{"filename":"/.git/objects/6c/9273959464446d1b884a6677d46a0aa0a8bb9e","crunched":0,"start":38402,"end":38568,"audio":false},{"filename":"/.git/objects/75/559e3046818cf9d30a41d493e570d5f77cfd94","crunched":0,"start":38568,"end":38730,"audio":false},{"filename":"/.git/objects/75/73d5f117ec55ea9eb2534f1ac7cfa8544beeb5","crunched":0,"start":38730,"end":39446,"audio":false},{"filename":"/.git/objects/7b/e7feba9ae880056ddf74ebd16ec3fcf37f10b6","crunched":0,"start":39446,"end":39613,"audio":false},{"filename":"/.git/objects/81/bbeba263505b99fcea3ccf1c2680ad257ab47a","crunched":0,"start":39613,"end":40348,"audio":false},{"filename":"/.git/objects/8b/4670944b22a1c9db9b83be82f9c60db7c216cf","crunched":0,"start":40348,"end":40970,"audio":false},{"filename":"/.git/objects/8e/fff980aff36f877a0492db09ad9cae185bce06","crunched":0,"start":40970,"end":41130,"audio":false},{"filename":"/.git/objects/96/0f3d303016810aea8f907be135bf861c29287f","crunched":0,"start":41130,"end":41590,"audio":false},{"filename":"/.git/objects/98/5a23d310f6f25a374964655fd0fa52e67c5f66","crunched":0,"start":41590,"end":41981,"audio":false},{"filename":"/.git/objects/9b/396bd3fac7d467b476eb69c4abe13a34e01a44","crunched":0,"start":41981,"end":42141,"audio":false},{"filename":"/.git/objects/a1/7681fbaf881b9b37b654ab14e210c6dc5da745","crunched":0,"start":42141,"end":42300,"audio":false},{"filename":"/.git/objects/af/4b0c154bad3cfa1619ae13542321549040d489","crunched":0,"start":42300,"end":43174,"audio":false},{"filename":"/.git/objects/af/fb4b4546e8806286a45d8021895fd4c69a0338","crunched":0,"start":43174,"end":43376,"audio":false},{"filename":"/.git/objects/b4/71e592796360bcc37311631ab95347e9241738","crunched":0,"start":43376,"end":43515,"audio":false},{"filename":"/.git/objects/b7/08df36216a26dd1fadd820ab6ef037fffbe24b","crunched":0,"start":43515,"end":43636,"audio":false},{"filename":"/.git/objects/b8/9eb83fb68942a67766d7423da20f0cba00c0b6","crunched":0,"start":43636,"end":43803,"audio":false},{"filename":"/.git/objects/bb/dd3d3eb5ec15df36d8368fd58eb4bb15d01292","crunched":0,"start":43803,"end":44428,"audio":false},{"filename":"/.git/objects/d3/1d22c212968c0c5f4628e5adf22bf3c96a99c9","crunched":0,"start":44428,"end":44587,"audio":false},{"filename":"/.git/objects/d3/d958aa12e152e702a8e77707cc3c93b832b470","crunched":0,"start":44587,"end":44944,"audio":false},{"filename":"/.git/objects/d8/e5746f023a2d83f406c19065fce247d8e98685","crunched":0,"start":44944,"end":45057,"audio":false},{"filename":"/.git/objects/e4/552d14e4ba572699128a196c83fa8a16b1be7e","crunched":0,"start":45057,"end":45212,"audio":false},{"filename":"/.git/objects/ea/2a12bbf6d2650058dc22ca3f18aefdf9ac73d6","crunched":0,"start":45212,"end":45973,"audio":false},{"filename":"/.git/objects/f8/5b964a98594de4b870f1eae60777bfa13240b1","crunched":0,"start":45973,"end":46439,"audio":false},{"filename":"/.git/objects/f9/d9a0e1c581fc4836877ee2116df8f5ed017951","crunched":0,"start":46439,"end":47269,"audio":false},{"filename":"/.git/objects/pack/pack-84eaa38c26b8041ecbf37f102e9c6f044d105a35.idx","crunched":0,"start":47269,"end":48481,"audio":false},{"filename":"/.git/objects/pack/pack-84eaa38c26b8041ecbf37f102e9c6f044d105a35.pack","crunched":0,"start":48481,"end":49757,"audio":false},{"filename":"/.git/packed-refs","crunched":0,"start":49757,"end":49869,"audio":false},{"filename":"/.git/refs/heads/main","crunched":0,"start":49869,"end":49910,"audio":false},{"filename":"/.git/refs/remotes/origin/HEAD","crunched":0,"start":49910,"end":49940,"audio":false},{"filename":"/.git/refs/remotes/origin/main","crunched":0,"start":49940,"end":49981,"audio":false},{"filename":"/Piece.lua","crunched":0,"start":49981,"end":52592,"audio":false},{"filename":"/Tile.lua","crunched":0,"start":52592,"end":53829,"audio":false},{"filename":"/board.png","crunched":0,"start":53829,"end":109687,"audio":false},{"filename":"/conf.lua","crunched":0,"start":109687,"end":109812,"audio":false},{"filename":"/dog.png","crunched":0,"start":109812,"end":116074,"audio":false},{"filename":"/dog0.png","crunched":0,"start":116074,"end":121742,"audio":false},{"filename":"/f.lua","crunched":0,"start":121742,"end":122071,"audio":false},{"filename":"/jaguar.png","crunched":0,"start":122071,"end":127931,"audio":false},{"filename":"/main.lua","crunched":0,"start":127931,"end":129625,"audio":false}]});

})();
