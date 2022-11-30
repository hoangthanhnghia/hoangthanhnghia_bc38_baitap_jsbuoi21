function Staff(id, fullName, email, passWord, datepicker, basicSalary, position, timeWorking) {
    this.staffId = id;
    this.fullName = fullName;
    this.email = email;
    this.passWord = passWord;
    this.datepicker = datepicker;
    this.basicSalary = basicSalary;
    this.position = position;
    this.timeWorking = timeWorking;

    this.fullSalary = function() {
        if( this.position === 'Sếp' ){
            return (this.basicSalary * 3);
        }
        else if( this.position === 'Trưởng phòng') {
            return (this.basicSalary) * 2;

        }else if( this.position === 'Nhân viên') {
            return (this.basicSalary) * 1;
        };
    };

    this.classification = function() {
       
            if (this.timeWorking >= 192) {
              return ("Nhân viên xuất sắc");
            } else if (this.timeWorking >= 176) {
              return  "Nhân viên giỏi ";
            } else if (this.timeWorking >= 160 ) {
              return ("Nhân viên khá ");
            } else if (this.timeWorking < 160 ) {
              return ("Nhân viên trung bình ");
            } else {
              return ("");
            };
        
    };
}