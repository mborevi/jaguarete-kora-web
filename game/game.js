
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
          if (Module['setStatus']) Module['setStatus']('Descargando... (' + loaded + '/' + total + ')');
        } else if (!Module.dataFileDownloads) {
          if (Module['setStatus']) Module['setStatus']('Descargando...');
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
      Module['FS_createPath']('/.git/objects', '1f', true, true);
      Module['FS_createPath']('/.git/objects', '40', true, true);
      Module['FS_createPath']('/.git/objects', '4d', true, true);
      Module['FS_createPath']('/.git/objects', '5e', true, true);
      Module['FS_createPath']('/.git/objects', '6b', true, true);
      Module['FS_createPath']('/.git/objects', '75', true, true);
      Module['FS_createPath']('/.git/objects', '8b', true, true);
      Module['FS_createPath']('/.git/objects', '8e', true, true);
      Module['FS_createPath']('/.git/objects', '96', true, true);
      Module['FS_createPath']('/.git/objects', '9b', true, true);
      Module['FS_createPath']('/.git/objects', 'a1', true, true);
      Module['FS_createPath']('/.git/objects', 'af', true, true);
      Module['FS_createPath']('/.git/objects', 'b4', true, true);
      Module['FS_createPath']('/.git/objects', 'b8', true, true);
      Module['FS_createPath']('/.git/objects', 'd3', true, true);
      Module['FS_createPath']('/.git/objects', 'd8', true, true);
      Module['FS_createPath']('/.git/objects', 'ea', true, true);
      Module['FS_createPath']('/.git/objects', 'f8', true, true);
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
  loadPackage({"package_uuid":"3cc38714-16cc-46a0-b5dc-9a974a0e03a4","remote_package_size":164645,"files":[{"filename":"/.git/COMMIT_EDITMSG","crunched":0,"start":0,"end":21,"audio":false},{"filename":"/.git/HEAD","crunched":0,"start":21,"end":42,"audio":false},{"filename":"/.git/config","crunched":0,"start":42,"end":353,"audio":false},{"filename":"/.git/description","crunched":0,"start":353,"end":426,"audio":false},{"filename":"/.git/hooks/applypatch-msg.sample","crunched":0,"start":426,"end":904,"audio":false},{"filename":"/.git/hooks/commit-msg.sample","crunched":0,"start":904,"end":1800,"audio":false},{"filename":"/.git/hooks/fsmonitor-watchman.sample","crunched":0,"start":1800,"end":6455,"audio":false},{"filename":"/.git/hooks/post-update.sample","crunched":0,"start":6455,"end":6644,"audio":false},{"filename":"/.git/hooks/pre-applypatch.sample","crunched":0,"start":6644,"end":7068,"audio":false},{"filename":"/.git/hooks/pre-commit.sample","crunched":0,"start":7068,"end":8711,"audio":false},{"filename":"/.git/hooks/pre-merge-commit.sample","crunched":0,"start":8711,"end":9127,"audio":false},{"filename":"/.git/hooks/pre-push.sample","crunched":0,"start":9127,"end":10501,"audio":false},{"filename":"/.git/hooks/pre-rebase.sample","crunched":0,"start":10501,"end":15399,"audio":false},{"filename":"/.git/hooks/pre-receive.sample","crunched":0,"start":15399,"end":15943,"audio":false},{"filename":"/.git/hooks/prepare-commit-msg.sample","crunched":0,"start":15943,"end":17435,"audio":false},{"filename":"/.git/hooks/push-to-checkout.sample","crunched":0,"start":17435,"end":20218,"audio":false},{"filename":"/.git/hooks/update.sample","crunched":0,"start":20218,"end":23868,"audio":false},{"filename":"/.git/index","crunched":0,"start":23868,"end":24293,"audio":false},{"filename":"/.git/info/exclude","crunched":0,"start":24293,"end":24533,"audio":false},{"filename":"/.git/logs/HEAD","crunched":0,"start":24533,"end":25510,"audio":false},{"filename":"/.git/logs/refs/heads/main","crunched":0,"start":25510,"end":26487,"audio":false},{"filename":"/.git/logs/refs/remotes/origin/HEAD","crunched":0,"start":26487,"end":26676,"audio":false},{"filename":"/.git/logs/refs/remotes/origin/main","crunched":0,"start":26676,"end":27260,"audio":false},{"filename":"/.git/objects/1f/336843c790ded7cd05364e1b4b7b2751c402d1","crunched":0,"start":27260,"end":27426,"audio":false},{"filename":"/.git/objects/40/916d60e81ffa8c8e1052f03f19829be4c877d7","crunched":0,"start":27426,"end":27826,"audio":false},{"filename":"/.git/objects/4d/d64c563f42a3a9e8c51684fe0367a425c90c6c","crunched":0,"start":27826,"end":27982,"audio":false},{"filename":"/.git/objects/5e/c158348a553718b1078b044cc43332975c9ab1","crunched":0,"start":27982,"end":28149,"audio":false},{"filename":"/.git/objects/6b/65f16d717883b9cced056d51fb4d989a7cf919","crunched":0,"start":28149,"end":28316,"audio":false},{"filename":"/.git/objects/75/73d5f117ec55ea9eb2534f1ac7cfa8544beeb5","crunched":0,"start":28316,"end":29032,"audio":false},{"filename":"/.git/objects/8b/4670944b22a1c9db9b83be82f9c60db7c216cf","crunched":0,"start":29032,"end":29654,"audio":false},{"filename":"/.git/objects/8e/fff980aff36f877a0492db09ad9cae185bce06","crunched":0,"start":29654,"end":29814,"audio":false},{"filename":"/.git/objects/96/0f3d303016810aea8f907be135bf861c29287f","crunched":0,"start":29814,"end":30274,"audio":false},{"filename":"/.git/objects/9b/396bd3fac7d467b476eb69c4abe13a34e01a44","crunched":0,"start":30274,"end":30434,"audio":false},{"filename":"/.git/objects/a1/7681fbaf881b9b37b654ab14e210c6dc5da745","crunched":0,"start":30434,"end":30593,"audio":false},{"filename":"/.git/objects/af/fb4b4546e8806286a45d8021895fd4c69a0338","crunched":0,"start":30593,"end":30795,"audio":false},{"filename":"/.git/objects/b4/71e592796360bcc37311631ab95347e9241738","crunched":0,"start":30795,"end":30934,"audio":false},{"filename":"/.git/objects/b8/9eb83fb68942a67766d7423da20f0cba00c0b6","crunched":0,"start":30934,"end":31101,"audio":false},{"filename":"/.git/objects/d3/1d22c212968c0c5f4628e5adf22bf3c96a99c9","crunched":0,"start":31101,"end":31260,"audio":false},{"filename":"/.git/objects/d3/d958aa12e152e702a8e77707cc3c93b832b470","crunched":0,"start":31260,"end":31617,"audio":false},{"filename":"/.git/objects/d8/e5746f023a2d83f406c19065fce247d8e98685","crunched":0,"start":31617,"end":31730,"audio":false},{"filename":"/.git/objects/ea/2a12bbf6d2650058dc22ca3f18aefdf9ac73d6","crunched":0,"start":31730,"end":32491,"audio":false},{"filename":"/.git/objects/f8/5b964a98594de4b870f1eae60777bfa13240b1","crunched":0,"start":32491,"end":32957,"audio":false},{"filename":"/.git/objects/pack/pack-84eaa38c26b8041ecbf37f102e9c6f044d105a35.idx","crunched":0,"start":32957,"end":34169,"audio":false},{"filename":"/.git/objects/pack/pack-84eaa38c26b8041ecbf37f102e9c6f044d105a35.pack","crunched":0,"start":34169,"end":35445,"audio":false},{"filename":"/.git/packed-refs","crunched":0,"start":35445,"end":35557,"audio":false},{"filename":"/.git/refs/heads/main","crunched":0,"start":35557,"end":35598,"audio":false},{"filename":"/.git/refs/remotes/origin/HEAD","crunched":0,"start":35598,"end":35628,"audio":false},{"filename":"/.git/refs/remotes/origin/main","crunched":0,"start":35628,"end":35669,"audio":false},{"filename":"/Piece.lua","crunched":0,"start":35669,"end":37861,"audio":false},{"filename":"/Tile.lua","crunched":0,"start":37861,"end":38860,"audio":false},{"filename":"/board.jpg","crunched":0,"start":38860,"end":157084,"audio":false},{"filename":"/conf.lua","crunched":0,"start":157084,"end":157230,"audio":false},{"filename":"/dog.jpg","crunched":0,"start":157230,"end":163011,"audio":false},{"filename":"/f.lua","crunched":0,"start":163011,"end":163340,"audio":false},{"filename":"/main.lua","crunched":0,"start":163340,"end":164645,"audio":false}]});

})();
