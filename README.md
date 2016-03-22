\* I'm working on inproving this readme, in the meantime you can contact me if you have any questions!

# node-simple-dependency-injector
This simple dependency injector for node is aimed to help solve a very anoying issue when developing in node.js.  
**Having to require modules by _where_ they are, their physical location relative to where you are now, instead of simply specifying _what_ you need**  


## Installation

      npm install node-simple-dependency-injector --save

## Usage

      require('nsdi').config(__dirname);
