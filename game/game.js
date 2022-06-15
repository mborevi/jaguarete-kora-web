
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
      Module['FS_createPath']('/.git/objects', '12', true, true);
      Module['FS_createPath']('/.git/objects', '19', true, true);
      Module['FS_createPath']('/.git/objects', '1f', true, true);
      Module['FS_createPath']('/.git/objects', '24', true, true);
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
      Module['FS_createPath']('/.git/objects', '84', true, true);
      Module['FS_createPath']('/.git/objects', '8b', true, true);
      Module['FS_createPath']('/.git/objects', '8e', true, true);
      Module['FS_createPath']('/.git/objects', '92', true, true);
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
      Module['FS_createPath']('/', 'assets', true, true);

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
  loadPackage({"package_uuid":"25ef6902-ef0f-4535-89a0-f66c8d251303","remote_package_size":133347,"files":[{"filename":"/.DS_Store","crunched":0,"start":0,"end":6148,"audio":false},{"filename":"/.git/COMMIT_EDITMSG","crunched":0,"start":6148,"end":6163,"audio":false},{"filename":"/.git/HEAD","crunched":0,"start":6163,"end":6184,"audio":false},{"filename":"/.git/config","crunched":0,"start":6184,"end":6495,"audio":false},{"filename":"/.git/description","crunched":0,"start":6495,"end":6568,"audio":false},{"filename":"/.git/hooks/applypatch-msg.sample","crunched":0,"start":6568,"end":7046,"audio":false},{"filename":"/.git/hooks/commit-msg.sample","crunched":0,"start":7046,"end":7942,"audio":false},{"filename":"/.git/hooks/fsmonitor-watchman.sample","crunched":0,"start":7942,"end":12597,"audio":false},{"filename":"/.git/hooks/post-update.sample","crunched":0,"start":12597,"end":12786,"audio":false},{"filename":"/.git/hooks/pre-applypatch.sample","crunched":0,"start":12786,"end":13210,"audio":false},{"filename":"/.git/hooks/pre-commit.sample","crunched":0,"start":13210,"end":14853,"audio":false},{"filename":"/.git/hooks/pre-merge-commit.sample","crunched":0,"start":14853,"end":15269,"audio":false},{"filename":"/.git/hooks/pre-push.sample","crunched":0,"start":15269,"end":16643,"audio":false},{"filename":"/.git/hooks/pre-rebase.sample","crunched":0,"start":16643,"end":21541,"audio":false},{"filename":"/.git/hooks/pre-receive.sample","crunched":0,"start":21541,"end":22085,"audio":false},{"filename":"/.git/hooks/prepare-commit-msg.sample","crunched":0,"start":22085,"end":23577,"audio":false},{"filename":"/.git/hooks/push-to-checkout.sample","crunched":0,"start":23577,"end":26360,"audio":false},{"filename":"/.git/hooks/update.sample","crunched":0,"start":26360,"end":30010,"audio":false},{"filename":"/.git/index","crunched":0,"start":30010,"end":30435,"audio":false},{"filename":"/.git/info/exclude","crunched":0,"start":30435,"end":30675,"audio":false},{"filename":"/.git/logs/HEAD","crunched":0,"start":30675,"end":32580,"audio":false},{"filename":"/.git/logs/refs/heads/main","crunched":0,"start":32580,"end":34485,"audio":false},{"filename":"/.git/logs/refs/remotes/origin/HEAD","crunched":0,"start":34485,"end":34674,"audio":false},{"filename":"/.git/logs/refs/remotes/origin/main","crunched":0,"start":34674,"end":36134,"audio":false},{"filename":"/.git/objects/01/a65c897839d39aa5323b5bdf3bab51fcceaa67","crunched":0,"start":36134,"end":36770,"audio":false},{"filename":"/.git/objects/0c/4761d31714f02f2cec0c8010b2d7fa18871a88","crunched":0,"start":36770,"end":37600,"audio":false},{"filename":"/.git/objects/0e/3140ec39b67eaf9291fec6349902c842bd20b5","crunched":0,"start":37600,"end":37755,"audio":false},{"filename":"/.git/objects/0e/7be5caecb37aba310d7079dfdf1777a05b5720","crunched":0,"start":37755,"end":37922,"audio":false},{"filename":"/.git/objects/12/038441f52cbfd5d4cbe2383296e83ab7c00e82","crunched":0,"start":37922,"end":38846,"audio":false},{"filename":"/.git/objects/19/d2cc891569550ba9a544d2c4c98d1a0550abf1","crunched":0,"start":38846,"end":39012,"audio":false},{"filename":"/.git/objects/1f/336843c790ded7cd05364e1b4b7b2751c402d1","crunched":0,"start":39012,"end":39178,"audio":false},{"filename":"/.git/objects/24/b69b49070a5793d2550a55bdf1b05495ba1018","crunched":0,"start":39178,"end":39335,"audio":false},{"filename":"/.git/objects/29/9166c9c5471de3388df30be398423e42dcc716","crunched":0,"start":39335,"end":39497,"audio":false},{"filename":"/.git/objects/40/916d60e81ffa8c8e1052f03f19829be4c877d7","crunched":0,"start":39497,"end":39897,"audio":false},{"filename":"/.git/objects/4d/d64c563f42a3a9e8c51684fe0367a425c90c6c","crunched":0,"start":39897,"end":40053,"audio":false},{"filename":"/.git/objects/5e/c158348a553718b1078b044cc43332975c9ab1","crunched":0,"start":40053,"end":40220,"audio":false},{"filename":"/.git/objects/67/0be608db2f80f78bb7ac20071ef5b0c86563b8","crunched":0,"start":40220,"end":40386,"audio":false},{"filename":"/.git/objects/67/753aff2d789384f65d04feb251ca328b96a1eb","crunched":0,"start":40386,"end":40541,"audio":false},{"filename":"/.git/objects/6b/65f16d717883b9cced056d51fb4d989a7cf919","crunched":0,"start":40541,"end":40708,"audio":false},{"filename":"/.git/objects/6c/9273959464446d1b884a6677d46a0aa0a8bb9e","crunched":0,"start":40708,"end":40874,"audio":false},{"filename":"/.git/objects/75/559e3046818cf9d30a41d493e570d5f77cfd94","crunched":0,"start":40874,"end":41036,"audio":false},{"filename":"/.git/objects/75/73d5f117ec55ea9eb2534f1ac7cfa8544beeb5","crunched":0,"start":41036,"end":41752,"audio":false},{"filename":"/.git/objects/7b/e7feba9ae880056ddf74ebd16ec3fcf37f10b6","crunched":0,"start":41752,"end":41919,"audio":false},{"filename":"/.git/objects/81/bbeba263505b99fcea3ccf1c2680ad257ab47a","crunched":0,"start":41919,"end":42654,"audio":false},{"filename":"/.git/objects/84/90f2a918cc980ae8751e19dba822b6f27e8ad8","crunched":0,"start":42654,"end":42820,"audio":false},{"filename":"/.git/objects/8b/4670944b22a1c9db9b83be82f9c60db7c216cf","crunched":0,"start":42820,"end":43442,"audio":false},{"filename":"/.git/objects/8e/fff980aff36f877a0492db09ad9cae185bce06","crunched":0,"start":43442,"end":43602,"audio":false},{"filename":"/.git/objects/92/9a32c1de0f7c8a4936d7e6bf8abe8b39040b7f","crunched":0,"start":43602,"end":44497,"audio":false},{"filename":"/.git/objects/96/0f3d303016810aea8f907be135bf861c29287f","crunched":0,"start":44497,"end":44957,"audio":false},{"filename":"/.git/objects/98/5a23d310f6f25a374964655fd0fa52e67c5f66","crunched":0,"start":44957,"end":45348,"audio":false},{"filename":"/.git/objects/9b/396bd3fac7d467b476eb69c4abe13a34e01a44","crunched":0,"start":45348,"end":45508,"audio":false},{"filename":"/.git/objects/a1/7681fbaf881b9b37b654ab14e210c6dc5da745","crunched":0,"start":45508,"end":45667,"audio":false},{"filename":"/.git/objects/a1/97707edbc57d7ad1922c71804ea3ee0d7f6ef2","crunched":0,"start":45667,"end":46198,"audio":false},{"filename":"/.git/objects/af/4b0c154bad3cfa1619ae13542321549040d489","crunched":0,"start":46198,"end":47072,"audio":false},{"filename":"/.git/objects/af/fb4b4546e8806286a45d8021895fd4c69a0338","crunched":0,"start":47072,"end":47274,"audio":false},{"filename":"/.git/objects/b4/71e592796360bcc37311631ab95347e9241738","crunched":0,"start":47274,"end":47413,"audio":false},{"filename":"/.git/objects/b7/08df36216a26dd1fadd820ab6ef037fffbe24b","crunched":0,"start":47413,"end":47534,"audio":false},{"filename":"/.git/objects/b8/9eb83fb68942a67766d7423da20f0cba00c0b6","crunched":0,"start":47534,"end":47701,"audio":false},{"filename":"/.git/objects/bb/dd3d3eb5ec15df36d8368fd58eb4bb15d01292","crunched":0,"start":47701,"end":48326,"audio":false},{"filename":"/.git/objects/d3/1d22c212968c0c5f4628e5adf22bf3c96a99c9","crunched":0,"start":48326,"end":48485,"audio":false},{"filename":"/.git/objects/d3/d958aa12e152e702a8e77707cc3c93b832b470","crunched":0,"start":48485,"end":48842,"audio":false},{"filename":"/.git/objects/d8/e5746f023a2d83f406c19065fce247d8e98685","crunched":0,"start":48842,"end":48955,"audio":false},{"filename":"/.git/objects/e4/552d14e4ba572699128a196c83fa8a16b1be7e","crunched":0,"start":48955,"end":49110,"audio":false},{"filename":"/.git/objects/ea/2a12bbf6d2650058dc22ca3f18aefdf9ac73d6","crunched":0,"start":49110,"end":49871,"audio":false},{"filename":"/.git/objects/f8/5b964a98594de4b870f1eae60777bfa13240b1","crunched":0,"start":49871,"end":50337,"audio":false},{"filename":"/.git/objects/f9/d9a0e1c581fc4836877ee2116df8f5ed017951","crunched":0,"start":50337,"end":51167,"audio":false},{"filename":"/.git/objects/pack/pack-84eaa38c26b8041ecbf37f102e9c6f044d105a35.idx","crunched":0,"start":51167,"end":52379,"audio":false},{"filename":"/.git/objects/pack/pack-84eaa38c26b8041ecbf37f102e9c6f044d105a35.pack","crunched":0,"start":52379,"end":53655,"audio":false},{"filename":"/.git/packed-refs","crunched":0,"start":53655,"end":53767,"audio":false},{"filename":"/.git/refs/heads/main","crunched":0,"start":53767,"end":53808,"audio":false},{"filename":"/.git/refs/remotes/origin/HEAD","crunched":0,"start":53808,"end":53838,"audio":false},{"filename":"/.git/refs/remotes/origin/main","crunched":0,"start":53838,"end":53879,"audio":false},{"filename":"/Piece.lua","crunched":0,"start":53879,"end":56598,"audio":false},{"filename":"/Tile.lua","crunched":0,"start":56598,"end":57835,"audio":false},{"filename":"/assets/board.png","crunched":0,"start":57835,"end":113693,"audio":false},{"filename":"/assets/dog.png","crunched":0,"start":113693,"end":119955,"audio":false},{"filename":"/assets/dog0.png","crunched":0,"start":119955,"end":125623,"audio":false},{"filename":"/assets/jaguar.png","crunched":0,"start":125623,"end":131483,"audio":false},{"filename":"/conf.lua","crunched":0,"start":131483,"end":131614,"audio":false},{"filename":"/f.lua","crunched":0,"start":131614,"end":131943,"audio":false},{"filename":"/main.lua","crunched":0,"start":131943,"end":133347,"audio":false}]});

})();
