angular.module("Bsys.Service", []).factory("$dService", function ($http) {
    return {
        findOrg: function (name) {
            if (name) {
                return $http.get(BASE_URI + "pc/org/list?name=" + name);
            } else {
                return $http.get(BASE_URI + "pc/org/list");
            }
        },
        findClassByOrg: function (id) {
            return $http.get(BASE_URI + "pc/class/list?org_id=" + id);
        },
        findStuByClass: function (id) {
            return $http.get(BASE_URI + "pc/student/list?class_id=" + id);
        },
        findSubject: function (id) {
            return $http.get(BASE_URI + "examCategory/getExamSubjects");
        },
        addOrg: function (name) {
            return $http.get(BASE_URI + "pc/org/create?name=" + name);
        },
        findMsgReceiveRoles: function () {
            return [{"id": "ALL", "name": "全部"}, {"id": "LS", "name": "老师"}, {"id": "JZ", "name": "家长"}]
        },
        addMessage: function (param) {
            return $http.post(BASE_URI + "sys/sendMsg", param);
        },
        findClassExamCate: function (id) {
            return $http.get(BASE_URI + "examCategory/getUploadExamByclass/" + id);
        },
        addFormData: function (url, fd) {
            return $http.post(url, fd, {
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                }
            )
        },
        addExamCate: function (obj) {
            return $http.post(BASE_URI + "scoreupload/admin/admin", obj);
        },
        findStuBindList: function (cls_id, stu_id) {
            return $http.post(BASE_URI + "class/studentBindInfo/JZ/admin/?class_id=" + cls_id + "&student_id=" + stu_id);
        },
        findClass: function () {
            return $http.get(BASE_URI + "pc/class/query");
        },
        delStuById: function (stuId, clsId) {
            return $http.get(BASE_URI + "pc/student/del?stu_id=" + stuId + "&class_id=" + clsId);
        },
        findClassByQuery: function (name, orgId) {
            return $http.get(BASE_URI + "pc/class/query?name=" + name + "&org_id=" + orgId);
        },
        findStuByQuery: function (name, clsId) {
            return $http.get(BASE_URI + "pc/student/query?name=" + name + "&class_id=" + clsId);
        },
        delClsById: function (clsId) {
            return $http.get(BASE_URI + "pc/class/del?class_id=" + clsId);
        },
        delOrgById: function (orgId) {
            return $http.get(BASE_URI + "pc/org/del?org_id=" + orgId);
        },
        findTeacherByClsId: function (clsId) {
            return $http.get(BASE_URI + "pc/teacher/list?class_id=" + clsId);
        },
        getSystemInfo: function () {
            return $http.get(BASE_URI + "pc/summary");
        },
        getSystemFeed: function () {
            return $http.get(BASE_URI + "pc/summary");
        },
        getUserActionHistory: function (oid, type) {
            if (type == "d") {
                return $http.get("http://123.56.236.126:8088/ZJS/actions/getActionLogs/d/" + oid);
            } else {
                return $http.get("http://123.56.236.126:8088/ZJS/actions/getActionLogs/w/" + oid);
            }

        }
    }
})