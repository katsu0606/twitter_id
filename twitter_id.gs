function myFunction() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getActiveSheet();
  
  var last_data_num = 10000;
  
  for(var i=2;i <= last_data_num;i++){
    var twitter_id = sheet.getRange(i, 2).getValue();//Twitter_idの取得
    
    if(twitter_id == ""){
      Browser.msgBox("終了しました");
      break;
    }
    
    var get_follow_data = 0;
    var get_follower_data = 0;
    var user_name = "";
    
    var url = "https://twitter.com/" + twitter_id + "/?lang=ja";
    var response = UrlFetchApp.fetch(url);
    var content = response.getContentText("UTF-8");
   
    var regExp   = new RegExp( '<div class="statnum">(.+)</div>');
    var myRegexp = /<div class="statnum">(.+)<\/div>/g;
    
    var regExp_name   = new RegExp( 'class="fullname">(.+)');
    var myRegexp_name = /class="fullname">(.+)/g;

    elements = response.getContentText().match(myRegexp);
    elements_name = response.getContentText().match(myRegexp_name);
    
    get_follow_data = elements[1];
    get_follower_data = elements[2]; 
    user_name = elements_name[0];
    
    get_follow_data = get_follow_data.match(regExp)[1];
    get_follower_data = get_follower_data.match(regExp)[1];
    user_name = user_name.match(regExp_name)[1];
    
    sheet.getRange(i,3).setValue(get_follow_data);//follow
    sheet.getRange(i,4).setValue(get_follower_data);//follower
    sheet.getRange(i,1).setValue(user_name);//name
  
  }
  
}
