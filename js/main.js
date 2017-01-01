/**
 * Does all the work.
 * It creates and adds the digital clock and registers event handlers.
 */
function start() {
  new Clock().main();             // create and insert dogital clock
  new MenuEventHandlers().main(); // register menu event handlers
  var axis = new Axis();
  
  var firstJump = "I have gone through the " + 
        "'Creative, Serious and Playful Science of Android Apps' course by " + 
        "University of Illinois. It was measurably difficult to fathom the concepts of " +
        " Android app development without prior programming and Java knowledge.";
  var mql = "As I got some programming skills, I have learnt some " +  
            "<a href='https://docs.mql4.com/' target='_blank'>MQL4 language</a> and let my computer " + 
            "help me, and test my trading strategies automatically. I have been writing " + 
            "trading robots only in procedural programming, which helped me to set my mindset " + 
            "into 'step-by-step' mode.";
  var java = "Unraveling period. Thorough, assiduous and complete study of <a href='http://math.hws.edu/javanotes/index.html' target='_blank'>Introduction to Programming Using Java</a> textbook. It has been intense and fruitful time working with this book. This masterpiece explained me previously vague aspects and gave me solid foundation and understanding of programming."; 
  var android = "Having gained ample programming and Java skills. I went through <a href='https://www.coursera.org/learn/android-programming' target='_blank'>Programming Mobile Applications for Android Handheld Systems: Part 1</a> and <a href='https://www.coursera.org/learn/android-programming-2' target='_blank'>Part 2</a> courses by University of Maryland. In order to supplement my knowledge I took also <a href='https://www.udacity.com/course/android-development-for-beginners--ud837' target='_blank'>Android Development for Beginners</a> course and Android Basics: <a href='https://www.udacity.com/course/android-basics-multi-screen-apps--ud839' target='_blank'>Multi-Screen Apps</a> and <a href='https://www.udacity.com/course/android-basics-networking--ud843' target='_blank'>Networking</a> by Udacity & Google.";
  var reJava = "While previous Java studying, the textbook included many exercises which I have solved that time. Nonetheless, to solidify the knowledge I have gone again through all exercises. I have refactored all of them to different extent. Refactored solutions to the exercises are uploaded on my <a href='https://github.com/frameture/introduction-to-programming-using-java' target='_blank'>repository</a>.";
  var js = "To add responsiveness to the web - we have to know JavaScript. I have studied <a href='http://eloquentjavascript.net/' target='_blank'>Eloquent JavaScript</a> by Marijn Haverbeke. It was quite strange experience learning JavaScript (untyped, interpreted and functional language) while having background in Java (strongly typed, compiled and object-oriented language). To better understand the language I have been solving JavaScript coding challenges on <a href='https://www.codewars.com/users/frameture' target='_blank'>Code Wars</a>.";
  var html = "Knowing HTML and CSS is a must in web development. I tried different resources including: <a href='https://www.codeschool.com/' target='_blank'>Code School</a>, <a href='http://www.w3schools.com/' target='_blank'>w3schoools</a> and <a href='https://www.codecademy.com/' target='_blank'> Codecademy</a>.";
  axis.addLog("First Jump Into Programming", firstJump ,new Date(2015,7), new Date(2015, 9));
  axis.addLog("Automated Trading", mql, new Date(2015, 9), new Date(2015, 11));
  axis.addLog("Java", java, new Date(2015, 11), new Date(2016, 5));
  axis.addLog("Android", android, new Date(2016, 5), new Date(2016, 8));
  axis.addLog("Repetition - Way For Sustainable Knowledge", reJava, new Date(2016, 8), new Date(2016, 11));
    axis.addLog("HTML & CSS", html, new Date(2016, 8), new Date(2016, 9));
  axis.addLog("JavaScript", js, new Date(2016, 9), new Date(2017, 0));

  axis.draw();
}
