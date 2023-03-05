angular.module("serialGenerator", [])
angular.module("serialGenerator").provider("serialGenerator", function () {

    let _lenght = 10

    this.getLength = function () {
        return _lenght;
    }

    this.setLenght = function (lenght) {
        _lenght = lenght;
    }

   this.$get = function () {
       return {
            generate : function () {
                let serial = ""
                while (serial.length < _lenght) {
                    serial += String.fromCharCode(Math.floor(Math.random() * 64) + 32)
                }
                return serial;
            }
       };
   };
});