// 在这里书写gulpfile.js的整理思路版本,不规范版本
const gulp = require('gulp');

// 任务一:压缩src文件下面的css文件夹里面的css文件
const cssmin = require('gulp-cssmin');
const autoprefixer = require('gulp-autoprefixer');
/* 
    使用autoprefixer需要 在package.json里面设置浏览器列表
    "browserslist": [
        "last 2 versions",
        "iOS>7",
        "Firefox < 20",
        "last 2 Explorer versions"
    ]
*/
const cssHandler = ()=>{
    return gulp.src('./src/css/*.css')
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css'))
}

// 任务二:移动src里面的images文件夹
const imgHandler = ()=>{
    return gulp.src('./src/static/img/**')
    .pipe(gulp.dest('./dist/images'))
}

// 任务三:压缩src里面的js文件夹里面的js文件
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
/* 
    下载包的时候,除了gulp-babel还有另外两个包:@babel/core @babel/preset-env
*/
const jsHanlder = ()=>{
    return gulp.src('./src/js/*.js')
    .pipe(babel({
        presets:['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
}

// 任务四:移动lib文件夹
const libHandler = ()=>{
    return gulp.src('./src/lib/*.js')
    .pipe(gulp.dest('./dist/lib'))
}

// 任务五:压缩src里面的pages里面的html文件
const htmlmin = require('gulp-htmlmin');
const htmlHanlder = ()=>{
    return gulp.src('./src/pages/*.html')
    .pipe(htmlmin({
        collapseWhitespace: true, //压缩空格
        removeAttributeQuotes:true, //移除属性的引号
        collapseBooleanAttributes:true,//把值为布尔值的属性简写
        removeComments:true,//移除注释
        minifyCSS:true,//把页面里面的style标签里面的css样式也去空格
        minifyJS:true,//把页面里的script标签里面的js代码给去空格
    }))
    .pipe(gulp.dest('./dist/pages'))
}

// 任务六:开启以dist为网站根目录的热更新的web服务器
const webserver = require('gulp-webserver');
const serverHanler = ()=>{
    return gulp.src('./dist')
    .pipe(webserver({
        port:8080,
        open:'./pages/index.html',
        livereload:true,
        proxies:[{
            source:'../static/data/login.php',
            target:`act=login&user=${user.value}&pass=${pass.value}`
        }],
    }))
}

// 任务七:监控src文件夹下面的所有文件
const watchHandler = ()=>{
    gulp.watch('./src/css/*.css',cssHandler);
    gulp.watch('./src/js/*.js',jsHanlder);
    gulp.watch('./src/pages/*.html',htmlHanlder);
    gulp.watch('./src/images/**',imgHandler);
    gulp.watch('./src/lib/*.js',libHandler)

    // 也需要监控sass文件夹里面的文件变化
    gulp.watch('./src/sass/*.scss',sassHandler)
}

// 任务八:删除dist目录
const del = require('del')
const delHandler = ()=>{
    return del(['./dist'])
}

// 任务九:编译和压缩src文件夹里面的sass文件夹里面的scss文件到dist目录中的css文件夹中
const sass = require('gulp-sass');
const sassHandler = ()=>{
    return gulp.src('./src/sass/*.scss')
    .pipe(sass())
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css'))
}
// 导入默认任务
module.exports.default = gulp.series(
    delHandler,
    gulp.parallel(
        cssHandler,jsHanlder,htmlHanlder,imgHandler,libHandler,sassHandler
    ),
    serverHanler,
    watchHandler
)