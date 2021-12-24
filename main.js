
/* 
function (Parameters 參數)
Parameters 參數 = Argurments = Inputs  
  -> Inputs can be String / Number (Integer / Float) / Boolean / Array / Object
  -> Output can also be -----------------------------------------------------^
*/


/*Constructor - Class User*/
function User (_email, _owner){
  this.email = _email;
  this.owner = _owner;
}

/*Constructor  - Class GDrive - 15GB*/
function GDrive (_user){
  this.user = _user;
  this.quota = File.parseFileSize("15GB");
  this.available = this.quota; //construt only, no files size available
  this.files = {};

}

/*Method/function- Inheritant by using "Prototype" */ 
GDrive.prototype.upload = function (_file){
  if (_file.filesize > this.available) return false;
/* if filename exist in "this.files", reject upload "_file" */
  if (this.files[_file.filename] != undefined) return false;
  this.files[_file.filename] = _file;
  this.available -= _file.getFileSize();
  return true;
}

GDrive.prototype.remove = function (_filename){
  if (this.files[_filename] == undefined) return false;
  this.available += this.files[_filename].filesize;
  delete this.files[_filename]; 
  return true;
}

/* 當console.log file content */
GDrive.prototype.download = function (_filename){
  if (this.files[_filename] == undefined) return false;
  if (this.files[_filename].filesize <= 0) return false;
  console.log (this.files[_filename].content);
  return true;
}
  

/* Constructor - Class GDrive_plus - 150GB */
function GDrive_plus (_user, _quota){
  /* this = GDrive_plus自己*/
  GDrive.call(this, _user);
  this.quota = File.parseFileSize(_quota);
  this.available = this.quota;
  /* 冇false & true 時, 冇野需要output , 淨係想運算唔需要俾人知, 就可以用 return void (空白) */
  return;
}
/* Inheritance 
@see https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance#setting_teachers_prototype_and_constructor_reference
 */
GDrive_plus.prototype = Object.create(GDrive.prototype);
Object.defineProperty(GDrive_plus.prototype,'constructor',{
  value: GDrive_plus,
  enumerable: false, // so that it does not appear in 'for in' loop
  writable: true });


/* Constructor - Class File */
function File (_filename, _filesize, _content){
  this.filename = _filename;
  this.filesize = _filesize;
  this.content = _content;
}

/* Method/Function - Static */
File.getSize = function(_filesize){
  return parseFloat (_filesize);
}

File.getUnit = function (_filesize) {
  /* substring = 將一條STRING抽一部份出來 */
  return _filesize.substring(
    /* 1. 抽數目字->2.''變做string->3.計.length 4. 抽走->_filesize淨番Unit
    10.5GB
        ^
        4
    10.5
    '10.5' => 4 */
    (
      ''+parseFloat(_filesize)
    ).length     
  )
}

File.parseUnit = function (_unit){
  /*switch = 分流 ->分幾條路俾var行, if 唔行, 就行特別通道*/
  switch (_unit) {
    /*default*/
    default:
      return 0;
    case "B":
      /*Math.pow = 乜野既乜野次方.i.e. 2既0次方=1*/
      return Math.pow (2,0);
    case "KB": 
      /*1024*/
      return Math.pow (2,10);
    case "MB":
      /*1024*1024*/
      return Math.pow (2,20);
    case "GB":
      return Math.pow (2,30);
    case "TB":
      return Math.pow (2,40);
  }
}

  /* switch example:
   var result = '';
  switch (num) {
    case '1':
      result = 'a ';
    case '3':
      result = 'b ';
    case '5':
    case '7':
    case '9':
      result += 'odd';
  // 分流結束,下面的result不會出現在上面
      break;
  // 0係一個偶數，因為0除以2，餘數係0
    case '2':
    case '4':
    case '6':
    case '8':
    case '0':
      result += 'even';
      break;
    default:
      result += 'dun know';
      break;
  }
  return result; */
/* parameters = 參數=(_filesize)  ---v */
File.parseFileSize = function (_filesize) {
/* get file size & tranform it to float*/
/* get unit & transform it to number*/
/* mutiply 2 numbers & get the 'B' number*/
  return File.getSize(_filesize) * File.parseUnit(File.getUnit(_filesize));
}

/* 最終目的-> thats why create 'File.parseFileSize' static to transform string into numbers*/
File.prototype.getFileSize = function () {
  return File.parseFileSize(this.filesize);
}

var basic = new User('basic.kl.law@gmail.com', 'Basic');
var basic_gdrive = new GDrive(basic);
basic_gdrive.upload(new File('Testing.docx', '3MB', 'Hello, world!fasjdhfkjashdfkasdf'));
basic_gdrive.upload(new File('Testing2.docx', '15GB', 'Lorem .....'));

console.log(basic_gdrive.user);
console.log(basic_gdrive.quota); //16106127360
console.log(File.getSize('10.5GB'));  // 10.5
console.log(File.getUnit('10.5GB'));  // GB
console.log(File.parseUnit('GB'));    // 1073741824 = 1024 to the power 3
console.log(File.parseFileSize('10.5GB')); // 11274289152

var file = new File('Testing file.doc', '30MB', '...');
console.log(file.getFileSize());       // 31457280

var ayer = new User('ayer@gmail.com', 'Ayer');
var ayer_gdrive = new GDrive_plus(ayer,"100GB");
ayer_gdrive.upload(new File('Testing.docx', '3MB', 'Hello, world!fasjdhfkjashdfkasdf'));
ayer_gdrive.upload(new File('Testing2.docx', '15GB', 'Lorem .....'));
console.log(ayer_gdrive.user);
console.log(ayer_gdrive.quota);
console.log(File.getSize('10.5GB'));
console.log(File.getUnit('30TB'));
console.log(File.parseUnit('GB)'));
console.log(File.parseFileSize('10.5GB'));
