var BASE_URI = "";
angular.module("Bsys", ["ui.router", "Bsys.Controller","Bsys.Directives"])
    .factory('timestampMarker', ["$rootScope", function ($rootScope) {
        var timestampMarker = {
            request: function (config) {
                $rootScope.loading = true;
                config.requestTimestamp = new Date().getTime();
                return config;
            },
            response: function (response) {
                $rootScope.loading = false;
                response.config.responseTimestamp = new Date().getTime();
                return response;
            }
        };
        return timestampMarker;
    }])
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
        $urlRouterProvider.otherwise("index");
        $httpProvider.interceptors.push('timestampMarker');
        $stateProvider.state("index", {
            url: "/index",
            controller: "HomeCtrl",
            templateUrl: "tpl/index.html"
        }).state("class", {
            url: "/class_index",
            params: {"org_id": null},
            controller: "ClassCtrl",
            templateUrl: "tpl/class/index.html"
        }).state("class_import", {
            url: "/class_import",
            params: {"org_id": null},
            controller: "ClassCtrl",
            templateUrl: "tpl/class/import.html"
        }).state("exam", {
            url: "/exam",
            controller: "ExamCtrl",
            templateUrl: "tpl/exam/index.html"
        }).state("exam_import", {
            url: "/exam_import",
            controller: "ExamCtrl",
            templateUrl: "tpl/exam/import.html"
        }).state("exam_add", {
            url: "/exam_add",
            controller: "ExamCtrl",
            templateUrl: "tpl/exam/add.html"
        }).state("student", {
            url: "/stu",
            params: {"cls_id": null},
            controller: "StudentCtrl",
            templateUrl: "tpl/stu/index.html"
        }).state("student_bind", {
            url: "/stu_bind",
            params: {"stu_id": null},
            controller: "StudentCtrl",
            templateUrl: "tpl/stu/detail.html"
        }).state("student_import", {
            url: "/stu_import",
            params: {"cls_id": null},
            controller: "StudentCtrl",
            templateUrl: "tpl/stu/import.html"
        }).state("sys", {
            url: "/sys_msg",
            controller: "SysMessageCtrl",
            templateUrl: "tpl/sys/index.html"
        }).state("sys_msg_add", {
            url: "/sys_msg_add",
            controller: "SysMessageCtrl",
            templateUrl: "tpl/sys/add.html"
        }).state("org", {
            url: "/org",
            controller: "OrgCtrl",
            templateUrl: "tpl/org/index.html"
        }).state("org_add", {
            url: "/org_add",
            controller: "OrgCtrl",
            templateUrl: "tpl/org/add.html"
        }).state("point", {
            url: "/point",
            controller: "PointCtrl",
            templateUrl: "tpl/point/index.html"
        }).state("teacher", {
            url: "/tea",
            params: {"cls_id": null},
            controller: "TeacherCtrl",
            templateUrl: "tpl/teacher/index.html"
        }).state("feed", {
            url: "/feed",
            controller: "FeedCtrl",
            templateUrl: "tpl/feed/index.html"
        })
    })