angular.module("Bsys.Controller", ["Bsys.Service"])
    .controller("ClassCtrl", function ($state, $scope, $dService, $stateParams) {
        if ($stateParams.org_id) {
            sessionStorage.org_id = $stateParams.org_id
        }
        $scope.org_id = sessionStorage.org_id;
        $scope.searchCls = function () {
            if ($scope.query.name) {
                $dService.findClassByQuery($scope.query.name, $scope.org_id).success(function (data) {
                    $scope.classList = data;
                })
            }
        }
        $scope.delClsById = function (id) {
            $dService.delClsById(id).success(function (data) {
                if (data.msg != "") {
                    alert(data.msg)
                }
                $scope.initClassList();
            })
        }
        $scope.initClassList = function (flag) {
            if (flag) {
                if ($scope.query) {
                    $scope.query.name = "";
                }
            }
            $dService.findClassByOrg(sessionStorage.org_id).success(function (data) {
                $scope.classList = data;
            }).error(function (data) {
                alert("服务器出错");
            })
        }
        $scope.findStu = function (id) {
            $state.go("student", {cls_id: id});
        }
        $scope.toAddCls = function () {
            $state.go("class_import", {org_id: $scope.org_id});
        }
        $scope.findTea = function (id) {
            $state.go("teacher", {cls_id: id});
        }
        $scope.addCls = function () {
            if ($scope.files) {
                var fd = new FormData()
                fd.append("file", $scope.files[0]);
                fd.append("org_id", $scope.org_id);
                $dService.addFormData(BASE_URI + "pc/import/class", fd).success(function (data) {
                    var rsmsg = "";
                    if (data) {
                        angular.forEach(data, function (data, index) {
                            rsmsg += "[" + index + " : " + data.info + "    " + data.msg + " ]  "
                        })
                    } else {
                        rsmsg = "error";
                    }
                    $scope.rsmsg = rsmsg;
                }).error(function (data) {
                    alert("服务器出错");
                })
            }
        }
        $scope.goOrgList = function () {
            $state.go("org");
        }
    }).controller("StudentCtrl", function ($state, $scope, $dService, $stateParams) {
        if ($stateParams.cls_id) {
            sessionStorage.cls_id = $stateParams.cls_id;
        }
        $scope.cls_id = sessionStorage.cls_id;
        $scope.searchStu = function () {
            if ($scope.query.name) {
                $dService.findStuByQuery($scope.query.name, $scope.cls_id).success(function (data) {
                    $scope.stuList = data;
                })
            }
        }
        $scope.delStu = function (id) {
            $dService.delStuById(id, $scope.cls_id).success(function (data) {
                if (data.msg != "") {
                    alert(data.msg)
                }
                $scope.initStuList();
            })
        }
        $scope.initStuList = function (flag) {
            if (flag) {
                if ($scope.query) {
                    $scope.query.name = "";
                }
            }
            $dService.findStuByClass($scope.cls_id).success(function (data) {
                $scope.stuList = data;
            }).error(function (data) {
                alert("服务器出错");
            });
        }
        $scope.toAddStu = function () {
            $state.go("student_import", {cls_id: $scope.cls_id})
        };
        $scope.goExam = function () {
            $state.go("exam");
        };
        $scope.addStu = function () {
            if ($scope.files) {
                var fd = new FormData()
                fd.append("file", $scope.files[0]);
                fd.append("class_id", $scope.cls_id);
                $dService.addFormData(BASE_URI + "pc/import/student", fd).success(function (data) {
                    var rsmsg = "";
                    if (data) {
                        angular.forEach(data, function (data, index) {
                            rsmsg += "[" + index + " : " + data.info + "    " + data.msg + " ]  "
                        })
                    } else {
                        rsmsg = "error";
                    }
                    $scope.rsmsg = rsmsg;
                }).error(function (data) {
                    alert("服务器出错");
                })
            }
        }
        $scope.goClass = function () {
            $state.go("class", {org_id: sessionStorage.org_id});
        }
        $scope.goStu = function () {
            $state.go("student", {cls_id: sessionStorage.cls_id});
        }
        $scope.toBindList = function (id) {
            $state.go("student_bind", {stu_id: id});
        }
        $scope.initStuDetail = function () {
            if ($stateParams.stu_id) {
                sessionStorage.stu_id = $stateParams.stu_id;
            }
            var stu_id = sessionStorage.stu_id;
            var cls_id = sessionStorage.cls_id;
            $dService.findStuBindList(cls_id, stu_id).success(function (data) {
                $scope.bindList = data;
            })
        }
    }).controller("SysMessageCtrl", function ($state, $scope, $dService) {
        $scope.toAddMessage = function () {
            $state.go("sys_msg_add");
        }
        $scope.roleList = $dService.findMsgReceiveRoles();
        $scope.initMessageList = function () {
            $dService.findMessage().success(function (data) {
                $scope.messageList = data;
            })
        };
        $scope.initClass = function () {
            $dService.findClass().success(function (data) {
                $scope.classList = data;
            }).error(function (data) {
                alert("服务器出错");
            })
        };
        $scope.selected = [];
        var updateSelected = function (action, id, name) {
            if (action == 'add' && $scope.selected.indexOf(id) == -1) {
                $scope.selected.push(id);
            }
            if (action == 'remove' && $scope.selected.indexOf(id) != -1) {
                var idx = $scope.selected.indexOf(id);
                $scope.selected.splice(idx, 1);
            }
        }

        $scope.updateSelection = function ($event, id) {
            var checkbox = $event.target;
            var action = (checkbox.checked ? 'add' : 'remove');
            updateSelected(action, id, checkbox.name);
        }
        $scope.isSelected = function (id) {
            return $scope.selected.indexOf(id) >= 0;
        }
        $scope.addMessage = function () {
            $scope.msg.classid = $scope.selected.join(",");
            $scope.msg.senttype = $scope.senttype.id;
            $dService.addMessage($scope.msg).success(function (data) {
                if (data.status) {
                    alert("Info:" + data.msg);
                }
            }).error(function (data) {
                alert("服务器出错");
            })
        }
    }).controller("ExamCtrl", function ($state, $scope, $dService) {
        $scope.cls_id = sessionStorage.cls_id;
        $scope.initExamUpload = function () {
            $scope.exam = {};
            $scope.exam.time = "2015-10-10";
            $scope.exam.jx_class_ids = $scope.cls_id;
            $dService.findClassExamCate($scope.cls_id).success(function (data) {
                $scope.examCateList = data;
            });
            $dService.findSubject().success(function (data) {
                $scope.subList = data;
            });
        }
        $scope.toAddExamCate = function () {
            $state.go("exam_add");
        };
        $scope.toAddExam = function () {
            $state.go("exam_import")
        };
        $scope.addExamCate = function () {
            subjects = [{
                "jx_subject_id": "LS",
                "score_type": "100",
                "isranking": "Y",
                "issum": "Y",
                "hava_child": "N"
            }];
            $scope.examCate = {}
            $scope.exam.createdBy = "admin";
            $scope.examCate.exam = $scope.exam;
            $scope.examCate.subjects = subjects;
            $dService.addExamCate($scope.examCate).success(function (data) {
                console.log(data);
            }).error(function (data) {
                alert("服务器出错");
            });
        }
        $scope.addExam = function () {
            if ($scope.files) {
                var fd = new FormData()
                fd.append("scorefile", $scope.files[0]);
                fd.append("classes", $scope.cls_id);
                fd.append("subjects", $scope.subjects.ID);
                fd.append("examcate", $scope.examcate.JX_EXAM_ID);
                $dService.addFormData(BASE_URI + "examCategory/uploadExamScore", fd).success(function (data) {
                    $scope.rsmsg = data;
                }).error(function (data) {
                    alert("服务器出错");
                })
            }
        }
    }).controller("OrgCtrl", function ($state, $scope, $dService, $timeout) {
        $scope.initOrgList = function (flag) {
            if (flag) {
                if ($scope.query) {
                    $scope.query.name = "";
                }
            }
            $dService.findOrg().success(function (data) {
                $scope.orgList = data;
            }).error(function (data) {
                alert("服务器出错");
            });
        }
        $scope.searchOrg = function () {
            if ($scope.query.name) {
                $dService.findOrg($scope.query.name).success(function (data) {
                    $scope.orgList = data;
                }).error(function (data) {
                    alert("服务器出错");
                });
            }
        }
        $scope.delOrg = function (id) {
            $dService.delOrgById(id).success(function (data) {
                if (data.msg != "") {
                    alert(data.msg)
                }
                $scope.initOrgList();
            });
        }
        $scope.findClass = function (id) {
            $state.go("class", {org_id: id});
        }
        $scope.toAddOrg = function (id) {
            $state.go("org_add");
        }
        $scope.addOrg = function () {
            if ($scope.orgName) {
                $dService.addOrg($scope.orgName).success(function (data) {
                    if (data.msg) {
                        alert(data.msg);
                        $scope.orgName = "";
                    } else {
                        $state.go("org");
                    }
                }).error(function (data) {
                    alert("服务器出错");
                });
            }
        }
    }).controller("TeacherCtrl", function ($scope, $state, $dService, $stateParams) {
        if ($stateParams.cls_id) {
            sessionStorage.cls_id = $stateParams.cls_id;
        }
        $scope.cls_id = sessionStorage.cls_id;
        $scope.initTeaList = function () {
            $dService.findTeacherByClsId($scope.cls_id).success(function (data) {
                $scope.teaList = data;
            }).error(function (data) {
                alert("服务器出错");
            })
        }
        $scope.goClass = function () {
            $state.go("class", {org_id: sessionStorage.org_id});
        }
    }).controller("PointCtrl", function ($scope, $dService, $state) {
        $scope.findPointByOid = function (type) {
            if ($scope.query.oid) {
                $dService.getUserActionHistory($scope.query.oid, type).success(function (data) {
                    $scope.actionList = data;
                }).error(function (data) {
                    alert("服务器出错");
                })
            }
        }
    }).controller("HomeCtrl", function ($scope, $dService) {
        $scope.initInfo = function (data) {
            $dService.getSystemInfo().success(function (data) {
                $scope.info = data;
            }).error(function (data) {
                alert("服务器出错");
            })
        }
    }).controller("FeedCtrl", function ($scope, $dService) {
        $scope.initFeed = function (data) {
            $dService.getSystemFeed().success(function (data) {
                $scope.feedList = data;
            }).error(function (data) {
                alert("服务器出错");
            })
        }
    })