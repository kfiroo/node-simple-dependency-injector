\* I'm working on inproving this readme, in the meantime you can contact me if you have any questions!

# node-simple-dependency-injector
This simple dependency injector for node is aimed to help solve a very anoying issue when developing in node.js.  
**Having to require modules by _where_ they are, their physical location relative to where you are now, instead of simply specifying _what_ you need**  

## Installation

      npm install node-simple-dependency-injector --save

## Usage
Add the following line at the entry point of your node application
```javascript
require('node-simple-dependency-injector').config(__dirname);
```
This will add a global `inject` function to your application that we will use below.

`inject` will first try to match your `some/module/name` to an entry in your config file, if no match was found it will fallback to a normal `require` call with the same param.  

### Configuration
**node-simple-dependency-injector** will look for a file called `injectorConfig.json` in your `__dirname` that will hold your configuration.

Your configuration is a map between the logical module/package names to the physical path in your code base.

Another option is to pass the a json object as the second parameter to `config`

##### Example configuration file
```json
{
    "base": "./server/lib",
    "modules": {
        "package1": {
            "module1": "./some-package/some-module",
            "module2": "./some-package/other-module"
        }
    }
}
```
With the above configuration you can require your modules like this:
```javascript
var someModule = inject('package1/module1'); // same as requiring (../)*some-package/some-module
```

The cool thing is that you can have a different config file when you are running your tests and inject what ever you need
##### Example test configuration file
```json
{
    "base": "./server/lib",
    "modules": {
        "package1": {
            "module1": "../test/some-package/some-module-mock"
        }
    }
}
```
Now when running the same line as before you will get `some-module-mock` in all places you injected `package1/module1` instead of getting `some-module` like we did before.

### Path building
We have 3 variables here that will construct the path to your module.  
1.  `root` - The first parameter to the `config` function  
2.  `base` - The value of `base` in the config json  
3.  `path` - The value of `module-logical-name` in your config json  

Basically all paths are resolved like this `path.join(root, base, path)`.  
  
* `root` will usually be the `__dirname` in your entry point file  
* `base` will be the path from your entry point file to the root of your code base (just to avoid having to write it over and over again for each module)  
* `path` should now be the path between where `base` point and where the actual file is

