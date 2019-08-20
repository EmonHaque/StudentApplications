/// <reference path="jquery-2.1.0-vsdoc.js" />
/// <reference path="jquery.validate.min.js" />
/// <reference path="materialize.js" />
/// <reference path="dx.chartjs.js" />


var Student = {
    Name: '',
    FatherName: '',
    MotherName: '',
    Religion: '',
    Gender: '',
    MaritalStatus: '',
    Nationality: '',
    DateOfBirth: '',
    Blood: '',

    ContactNo: '',
    Email: '',
    PresentAddress: '',
    PermanentAddress: '',
    EmergencyContactNo: '',
    RelationWithEmergencyContact: '',
    ApplicationFor: '',
    AppSubject: '',
    AppBody: '',


    SSC: {
        Board: '',
        YearOfPass: '',
        CGPA: '',
        Institute: ''
    },
    OLevel: {
        Board: '',
        YearOfPass: '',
        Institute: '',
        Subjects: []
    },
    HSC: {
        Board: '',
        YearOfPass: '',
        CGPA: '',
        Institute: ''
    },
    ALevel: {
        Board: '',
        YearOfPass: '',
        Institute: '',
        Subjects: []
    },
    Bachelor: {
        Type: '',
        Title: '',
        Major: '',
        YearOfPass: '',
        CGPA: '',
        Institute: '',
        University: ''
    },
    Master: {
        Type: '',
        Title: '',
        Major: '',
        YearOfPass: '',
        CGPA: '',
        Institute: '',
        University: ''
    },
    CMA: {
        Institute: '',
        YearOfPass: ''
    },
    ACCA: {
        Institute: '',
        YearOfPass: ''
    },

    Objective: '',
    Reference: [],
    CurrentJob: {
        Position: '',
        Organisation: '',
        From: '',
        Responsibilities: ''
    },
    Experiences: [],
    PartnerMembership: [],
    PartnerPastPosition: [],
    PartnerCurrentPosition: []
};

$(document).ready(function () {
    new WOW().init();
    $('.carousel').carousel();
    window.setInterval(function () { $('.carousel').carousel('next') }, 2000);

    $.validator.setDefaults({
        ignore: []
    });

    $.validator.addMethod("regx", function (value, element, regexpr) {
        return regexpr.test(value);
    });

    var singletransfervalidation = {
        rules: {
            ddlSelectPartner: {
                required: true
            },
            ddlSelectManager: {
                required: true
            }
        },

        messages: {
            ddlSelectPartner: {
                required: "Choose"
            },
            ddlSelectManager: {
                required: "Choose"
            }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
            error.css('color', 'red');
        }
    };

    var transfervalidation = {
        rules: {
            ddlSelectManager: {
                required: true
            }
        },

        messages: {
            ddlSelectManager: {
                required: "Choose"
            }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
            error.css('color', 'red');
        }
    };

    var empTransfervalidation = {
        rules: {
            ddlSelectPartner1: {
                required: true
            }
        },

        messages: {
            ddlSelectPartner1: {
                required: "Choose"
            }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
            error.css('color', 'red');
        }
    };

    var allStuTransfervalidation = {
        rules: {
            ddlSelectPartner2: {
                required: true
            },
            ddlSelectManager: {
                required: true
            }
        },

        messages: {
            ddlSelectPartner2: {
                required: "Choose"
            },
            ddlSelectManager: {
                required: "Choose"
            }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
            error.css('color', 'red');
        }
    };

    var noteonapplicationvalidation = {
        rules: {
            txtManagerNote: {
                required: true,
                regx: /^[A-z0-9:,\-'\s\.]+$/,
                minlength: 1,
                maxlength: 500
            }
        },

        messages: {
            txtManagerNote: {
                required: "Write something",
                regx: "Alphanumeric, colon, comma, dash, apostrophe, space and period only",
                minlength: "At least 1 character",
                maxlength: "Atmost 500 character"
            }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
            error.css('color', 'red');
        },

        onkeyup: function (element, event) {
            $(element).valid();
        }
    };

    var partnernoteonapplicationvalidation = {
        rules: {
            txtManagerNote: {
                required: true,
                regx: /^[A-z0-9:,\-'\s\.]+$/,
                minlength: 1,
                maxlength: 500
            },
            AppAcceptance: { required: true }
        },

        messages: {
            txtManagerNote: {
                required: "Write something",
                regx: "Alphanumeric, colon, comma, dash, apostrophe, space and period only",
                minlength: "At least 1 character",
                maxlength: "Maximum 500 character"
            },
            AppAcceptance: { required: "Accept or Reject" }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            if (element.attr("type") == "radio") {
                error.insertBefore('#reqMsg');

            } else {
                error.insertAfter(element);
            }
            error.css('color', 'red');
        }
    };

    var studentjoiningvalidation = {
        rules: {
            txtInitUserName: {
                required: true,
                regx: /^[A-z\-\d]+$/,
                minlength: 1,
                maxlength: 50
            },
            txtInitPassword: {
                required: true,
                regx: /^[A-z\-\d]+$/,
                minlength: 1,
                maxlength: 50
            },
            ddlSelectPartner: {
                required: true
            },
            ddlSelectManager: {
                required: true
            }
        },

        messages: {
            txtInitUserName: {
                required: "Enter a Username",
                regx: "Alphanumeric and space only",
                minlength: "At least 1 character",
                maxlength: "Maximum 50 character"
            },
            txtInitPassword: {
                required: "Enter a Password",
                regx: "Alphanumeric and space only",
                minlength: "At least 1 character",
                maxlength: "Maximum 50 character"
            },
            ddlSelectPartner: {
                required: "Choose"
            },
            ddlSelectManager: {
                required: "Choose"
            }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
            error.css('color', 'red');
        },

        onkeyup: function (element, event) {
            $(element).valid();
        }
    };

    var promotionvalidation = {
        rules: {
            ddlSelectPartner: {
                required: true
            },
            ddlSelectDepartment: {
                required: true
            },
            ddlSelectPosition: {
                required: true
            }
        },

        messages: {
            ddlSelectPartner: {
                required: "Choose"
            },
            ddlSelectDepartment: {
                required: "Choose"
            },
            ddlSelectPosition: {
                required: "Choose"
            }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
            error.css('color', 'red');
        },

        onkeyup: function (element, event) {
            $(element).valid();
        }
    };

    var employeejoiningvalidation = {
        rules: {
            txtInitUserName: {
                required: true,
                regx: /^[A-z\-\d]+$/,
                minlength: 1,
                maxlength: 50
            },
            txtInitPassword: {
                required: true,
                regx: /^[A-z\-\d]+$/,
                minlength: 1,
                maxlength: 50
            },
            ddlSelectPartner: {
                required: true
            },
            ddlSelectDepartment: {
                required: true
            },
            ddlSelectPosition: {
                required: true
            }
        },

        messages: {
            txtInitUserName: {
                required: "Enter a Username",
                regx: "Alphanumeric and space only",
                minlength: "At least 1 character",
                maxlength: "Maximum 50 character"
            },
            txtInitPassword: {
                required: "Enter a Password",
                regx: "Alphanumeric and space only",
                minlength: "At least 1 character",
                maxlength: "Maximum 50 character"
            },
            ddlSelectPartner: {
                required: "Choose"
            },
            ddlSelectDepartment: {
                required: "Choose"
            },
            ddlSelectPosition: {
                required: "Choose"
            }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
            error.css('color', 'red');
        },

        onkeyup: function (element, event) {
            $(element).valid();
        }
    };

    var jobappvalidationobject = {
        rules: {
            txtAppSubject: {
                required: true,
                minlength: 5,
                maxlength: 150,
                regx: /^[A-z0-9:,\-'\s\.]+$/
            },
            JobApplicationBody: {
                required: true,
                minlength: 5,
                maxlength: 1500,
                regx: /^[A-z0-9:,\-'\s\.]+$/
            }
        },
        messages: {
            txtAppSubject: {
                required: "Write something",
                minlength: "Atleast 5 character",
                maxlength: "Atmost 150 character",
                regx: "Alphanumeric, colon, comma, dash, apostrophe, space and period only"
            },
            JobApplicationBody: {
                required: "Write something",
                minlength: "Atleast 5 character",
                maxlength: "Atmost 1500 character",
                regx: "Alphanumeric, colon, comma, dash, apostrophe, space and period only"
            }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
            error.css('color', 'red');
        },

        onkeyup: function (element, event) {
            $(element).valid();
        }
    };

    var joiningappvalidationobject = {
        rules: {
            txtJoiningSubject: {
                required: true,
                minlength: 5,
                maxlength: 75,
                regx: /^[A-z0-9:,\-'\s\.]+$/
            },
            JoiningBody: {
                required: true,
                minlength: 5,
                maxlength: 1500,
                regx: /^[A-z0-9:,\-'\s\.]+$/
            }
        },
        messages: {
            txtJoiningSubject: {
                required: "Write something",
                minlength: "Atleast 5 character",
                maxlength: "Atmost 75 character",
                regx: "Alphanumeric, colon, comma, dash, apostrophe, space and period only"
            },
            JoiningBody: {
                required: "Write something",
                minlength: "Atleast 5 character",
                maxlength: "Atmost 1500 character",
                regx: "Alphanumeric, colon, comma, dash, apostrophe, space and period only"
            }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
            error.css('color', 'red');
        },

        onkeyup: function (element, event) {
            $(element).valid();
        }
    };

    var memberCurrentPositionValidation = {
        rules: {
            txtCurrentPosition: {
                required: true,
                regx: /^[A-z\-\d\s]+$/,
                minlength: 1,
                maxlength: 75
            },
            txtCurrentOrganisation: {
                required: true,
                regx: /^[A-z\-\d\s]+$/,
                minlength: 1,
                maxlength: 75
            },
            txtCurrentPositionFrom: {
                required: true
            }
        },

        messages: {
            txtCurrentPosition: {
                required: "Enter position",
                regx: "Alphanumeric, dash and space only",
                minlength: "At least 1 digit",
                maxlength: "Maximum 75 digit"
            },
            txtCurrentOrganisation: {
                required: "Enter Organisation name and Address",
                regx: "Alphanumeric, dash and space only",
                minlength: "At least 1 digit",
                maxlength: "Maximum 75 digit"
            },

            txtCurrentPositionFrom: {
                required: "Choose a date"
            }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
            error.css('color', 'red');
        },

        onkeyup: function (element, event) {
            $(element).valid();
        }
    };

    var memberPastPositionValidation = {
        rules: {
            txtPastPosition: {
                required: true,
                regx: /^[A-z\-\d\s]+$/,
                minlength: 1,
                maxlength: 75
            },
            txtPastOrganisation: {
                required: true,
                regx: /^[A-z\-\d\s]+$/,
                minlength: 1,
                maxlength: 75
            },
            txtPastPositionFrom: {
                required: true
            },
            txtPastPositionTo: {
                required: true
            }
        },

        messages: {
            txtPastPosition: {
                required: "Enter position",
                regx: "Alphanumeric, dash and space only",
                minlength: "At least 1 digit",
                maxlength: "Maximum 75 digit"
            },
            txtPastOrganisation: {
                required: "Enter Organisation name and Address",
                regx: "Alphanumeric, dash and space only",
                minlength: "At least 1 digit",
                maxlength: "Maximum 75 digit"
            },

            txtPastPositionFrom: {
                required: "Choose date"
            },
            txtPastPositionTo: {
                required: "Choose date"
            }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
            error.css('color', 'red');
        },

        onkeyup: function (element, event) {
            $(element).valid();
        }
    };

    var membershipValidationObject = {
        rules: {
            txtMembershipId: {
                required: true,
                regx: /^[A-z\-\d\s]+$/,
                minlength: 1,
                maxlength: 50
            }
        },

        messages: {
            txtMembershipId: {
                required: "Enter Membership Identification",
                regx: "Alphanumeric, dash and space only",
                minlength: "At least 1 character",
                maxlength: "Maximum 50 character"
            }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
            error.css('color', 'red');
        },

        onkeyup: function (element, event) {
            $(element).valid();
        }
    };

    var membersOrgName = {
        rules: {
            txtMembersOrgName: {
                required: true,
                minlength: 5,
                maxlength: 75,
                regx: /^[A-z,\-'\s\.]+$/
            }
        },
        messages: {
            txtMembersOrgName: {
                required: "Write Name of the Organisation",
                minlength: "Atleast 5 character",
                maxlength: "Atmost 75 character",
                regx: "Alphabets, comma, dash, apostrophe, space and period only"
            }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
            error.css('color', 'red');
        },

        onkeyup: function (element, event) {
            $(element).valid();
        }
    };

    var bachelorUniversity = {
        rules: {
            txtBachelorUniversityName: {
                required: true,
                minlength: 5,
                maxlength: 75,
                regx: /^[A-z,\-'\s\.]+$/
            }
        },
        messages: {

            txtBachelorUniversityName: {
                required: "Write Name of the University",
                minlength: "Atleast 5 character",
                maxlength: "Atmost 75 character",
                regx: "Alphabets, comma, dash, apostrophe, space and period only"
            }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
            error.css('color', 'red');
        },

        onkeyup: function (element, event) {
            $(element).valid();
        }
    };

    var masterUniversity = {
        rules: {
            txtMasterUniversityName: {
                required: true,
                minlength: 5,
                maxlength: 75,
                regx: /^[A-z,\-'\s\.]+$/
            }
        },
        messages: {

            txtMasterUniversityName: {
                required: "Write Name of the University",
                minlength: "Atleast 5 character",
                maxlength: "Atmost 75 character",
                regx: "Alphabets, comma, dash, apostrophe, space and period only"
            }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
            error.css('color', 'red');
        },

        onkeyup: function (element, event) {
            $(element).valid();
        }
    };

    var applicationSubject = {
        rules: {
            txtAppSubject: {
                required: true,
                minlength: 5,
                maxlength: 75,
                regx: /^[A-z,\-'\s\.]+$/
            }
        },
        messages: {
            txtAppSubject: {
                required: "Write Subject of Application",
                minlength: "Atleast 5 character",
                maxlength: "Atmost 75 character",
                regx: "Alphabets, comma, dash, apostrophe, space and period only"
            }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
            error.css('color', 'red');
        },

        onkeyup: function (element, event) {
            $(element).valid();
        }
    };

    var applicationvalidationobject = {
        rules: {
            //ddlAddressee: {
            //    required: true
            //},
            ddlAppSubject: {
                required: true
            },
            ApplicationBody: {
                required: true,
                minlength: 50,
                maxlength: 1500,
                regx: /^[A-z0-9:,\-'\s\.]+$/
            }
        },
        messages: {
            //ddlAddressee: {
            //    required: "Select Addressee"
            //},
            ddlAppSubject: {
                required: "Select Subject"
            },
            ApplicationBody: {
                required: "Write something",
                minlength: "Atleast 50 character",
                maxlength: "Atmost 1500 character",
                regx: "Alphanumeric, colon, comma, dash, apostrophe, space and period only"
            }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
            error.css('color', 'red');
        },
    };

    var photovalidationobject = {
        rules: {
            UploadFile: {
                required: true,
                accept: "image/jpeg, image/jpg"
            }
        },
        messages: {
            UploadFile: {
                required: "Upload photo",
                accept: "JPEG only"
            }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            var placement = $(element).data('error');
            if (element.attr("type") == "file") {
                error.insertAfter('#PhotoError');
            } else {
                error.insertAfter(element);
            }
            error.css('color', 'red');
        },
        onchange: function (element, event) {
            $(element).valid();
        }
    };

    var basicvalidationobject = {
        rules: {
            txtName: {
                required: true,
                regx: /^[A-z\s\.]+$/,
                minlength: 5,
                maxlength: 50
            },
            txtFatherName: {
                required: true,
                regx: /^[A-z\s\.]+$/,
                minlength: 5,
                maxlength: 50
            },
            txtMotherName: {
                required: true,
                regx: /^[A-z\s\.]+$/,
                minlength: 5,
                maxlength: 50
            },
            ddlReligion: { required: true },
            ddlGender: { required: true },
            ddlMaritalStatus: { required: true },
            txtNationality: {
                required: true,
                regx: /^[A-z]+$/,
                minlength: 5,
                maxlength: 15
            },
            txtDateOfBirth: {
                required: true,
            },
            ddlBlood: { required: true }
        },

        messages: {
            txtName: {
                required: "Enter your name",
                minlength: "Enter at least 5 characters",
                regx: "Alphabets, space and period only",
                maxlength: 'Maximum 30 characters'
            },
            txtFatherName: {
                required: "Enter your father's name",
                minlength: "Enter at least 5 characters",
                regx: "Alphabets, space and period only",
                maxlength: 'Maximum 30 characters'
            },
            txtMotherName: {
                required: "Enter your mother's name",
                minlength: "Enter at least 5 characters",
                regx: "Alphabets, space and period only",
                maxlength: 'Maximum 30 characters'
            },
            ddlReligion: {
                required: "Select religion"
            },
            ddlGender: {
                required: "Select gender"
            },
            ddlMaritalStatus: {
                required: "select status"
            },
            txtNationality: {
                required: "Enter your nationality",
                minlength: "Enter at least 5 characters",
                regx: "Alphabets only",
                maxlength: 'Maximum 15 characters'
            },
            txtDateOfBirth: {
                required: "Select date"
            },
            ddlBlood: {
                required: "select group"
            }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
            error.css('color', 'red');
        },

        onkeyup: function (element, event) {
            $(element).valid();
        }
    };

    var contactvalidationobject = {
        rules: {
            txtContactNo: {
                required: true,
                regx: /^[\d]+$/,
                minlength: 7,
                maxlength: 11
            },
            txtEmergencyContactNo: {
                required: true,
                regx: /^[\d]+$/,
                minlength: 7,
                maxlength: 11
            },
            txtPresentAddress: {
                required: true,
                regx: /^[A-z\s,#:/-\d&\.]+$/,
                minlength: 5,
                maxlength: 150
            },
            txtPermanentAddress: {
                required: true,
                regx: /^[A-z\s,#:/-\d&\.]+$/,
                minlength: 5,
                maxlength: 150
            },
            txtRelationEmergencyContact: {
                required: true,
                regx: /^[A-z\s]+$/,
                minlength: 5,
                maxlength: 30
            }
        },
        messages: {
            txtContactNo: {
                required: "Enter a phone number",
                minlength: "Enter at least 7 digit without space",
                regx: "Digit only",
                maxlength: 'Maximum 11 digits'
            },
            txtPresentAddress: {
                required: "Enter your present address",
                minlength: "Enter at least 5 characters",
                regx: "Alphabets space, comma, dash, period and back-slash only",
                maxlength: 'Maximum 150 characters'
            },
            txtPermanentAddress: {
                required: "Enter your permanent address",
                minlength: "Enter at least 5 characters",
                regx: "Alphabets space, comma, dash, period and back-slash only",
                maxlength: 'Maximum 150 characters'
            },
            txtEmergencyContactNo: {
                required: "Enter a phone number",
                minlength: "Enter at least 7 digit without space",
                regx: "Digit only",
                maxlength: 'Maximum 11 digits'
            },
            txtRelationEmergencyContact: {
                required: "Enter relation",
                minlength: "Enter at least 5 characters",
                regx: "Alphabets and space only",
                maxlength: 'Maximum 30 characters'
            }
        },

        errorElement: 'div',
        errorPlacement: function (error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
            error.css('color', 'red');
        },

        onkeyup: function (element, event) {
            $(element).valid();
        }

    };

    var referencevalidationobject = {
        rules: {
            txtReferenceName: {
                required: true,
                regx: /^[A-z\s\.]+$/,
                minlength: 5,
                maxlength: 50
            },
            txtRefDesignation: {
                required: true,
                regx: /^[A-z\s,]+$/,
                minlength: 5,
                maxlength: 30
            },
            txtOrganisation: {
                required: true,
                regx: /^[A-z\s,/-\d&\.]+$/,
                minlength: 5,
                maxlength: 150
            },
            txtRefContactNo: {
                required: true,
                regx: /^[\d]+$/,
                minlength: 7,
                maxlength: 11
            },
            txtRefRelation: {
                required: true,
                regx: /^[A-z\s]+$/,
                minlength: 5,
                maxlength: 30
            }
        },
        //For custom messages
        messages: {
            txtReferenceName: {
                required: "Enter a name",
                minlength: "Enter at least 5 characters",
                regx: "Alphabets, space and period only",
                maxlength: 'Maximum 30 characters'
            },
            txtRefDesignation: {
                required: "Enter a position",
                minlength: "Enter at least 5 characters",
                regx: "Alphabets, space and comma only",
                maxlength: 'Maximum 30 characters'
            },
            txtOrganisation: {
                required: "Enter a organisation name",
                minlength: "Enter at least 5 characters",
                regx: "Alphabets space, comma, dash, period and back-slash only",
                maxlength: 'Maximum 150 characters'
            },
            txtRefContactNo: {
                required: "Enter a phone number",
                minlength: "Enter at least 7 digit without space",
                regx: "Digit only",
                maxlength: 'Maximum 11 digits'
            },
            txtRefRelation: {
                required: "Enter relation",
                minlength: "Enter at least 5 characters",
                regx: "Alphabets and space only",
                maxlength: 'Maximum 30 characters'
            },

        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
            error.css('color', 'red');
        },

        onkeyup: function (element, event) {
            $(element).valid();
        }
    };

    var currentJobValidationObject = {
        rules: {
            txtCurrentPosition: {
                required: true,
                regx: /^[A-z\s\.]+$/,
                minlength: 5,
                maxlength: 50
            },
            txtCurrentOrganisation: {
                required: true,
                regx: /^[A-z\s\.]+$/,
                minlength: 5,
                maxlength: 50
            },
            txtCurrentResponsibilities: {
                required: true,
                regx: /^[A-z0-9\-:'"\s\.]+$/,
                minlength: 5,
                maxlength: 250
            },

            txtCurrentExperienceFrom: {
                required: true,
            }
        },

        messages: {
            txtCurrentPosition: {
                required: "Enter your name",
                minlength: "Enter at least 5 characters",
                regx: "Alphabets, space and period only",
                maxlength: 'Maximum 30 characters'
            },
            txtCurrentOrganisation: {
                required: "Enter your father's name",
                minlength: "Enter at least 5 characters",
                regx: "Alphabets, space and period only",
                maxlength: 'Maximum 30 characters'
            },
            txtCurrentResponsibilities: {
                required: "Enter your mother's name",
                minlength: "Enter at least 5 characters",
                regx: "Alphabets, space and period only",
                maxlength: 'Maximum 30 characters'
            },
            txtCurrentExperienceFrom: {
                required: "Select date"
            }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
            error.css('color', 'red');
        },

        onkeyup: function (element, event) {
            $(element).valid();
        }
    };

    var ExperienceRadioValidation = {
        rules: {
            Experience: {
                required: true
            }
        },
        //For custom messages
        messages: {
            Experience: {
                required: "Choose one"
            }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            if (element.attr("type") == "radio") {
                error.insertBefore(element);
            } else {
                error.insertAfter(element);
            }
            error.css('color', 'red');
        },
    };

    var ExperienceValidationObject = {
        rules: {
            txtPosition: {
                required: true,
                regx: /^[A-z\s\.]+$/,
                minlength: 5,
                maxlength: 50
            },
            txtOrganisation: {
                required: true,
                regx: /^[A-z\s\.]+$/,
                minlength: 5,
                maxlength: 50
            },
            txtResponsibilities: {
                required: true,
                regx: /^[A-z0-9\-:'"\s\.]+$/,
                minlength: 5,
                maxlength: 250
            },

            txtExperienceFrom: {
                required: true,
            },
            txtExperienceTo: {
                required: true,
            }
        },

        messages: {
            txtPosition: {
                required: "Enter your name",
                minlength: "Enter at least 5 characters",
                regx: "Alphabets, space and period only",
                maxlength: 'Maximum 30 characters'
            },
            txtOrganisation: {
                required: "Enter your father's name",
                minlength: "Enter at least 5 characters",
                regx: "Alphabets, space and period only",
                maxlength: 'Maximum 30 characters'
            },
            txtResponsibilities: {
                required: "Enter your mother's name",
                minlength: "Enter at least 5 characters",
                regx: "Alphabets, space and period only",
                maxlength: 'Maximum 30 characters'
            },
            txtExperienceFrom: {
                required: "Select date"
            },
            txtExperienceTo: {
                required: "Select date"
            }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
            error.css('color', 'red');
        },

        onkeyup: function (element, event) {
            $(element).valid();
        }
    };

    var objectivevalidationobject = {
        rules: {
            txtObjective: {
                required: true,
                regx: /^[A-z\s\.]+$/,
                minlength: 5,
                maxlength: 500
            },
            SeekType: {
                required: true
            }
        },
        //For custom messages
        messages: {
            txtObjective: {
                required: "Enter your objective",
                minlength: "Enter at least 5 characters",
                regx: "Alphabets, space and period only",
                maxlength: 'Maximum 250 characters'
            },
            SeekType: {
                required: "Choose one"
            }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            if (element.attr("type") == "radio") {
                error.insertBefore(element);
            } else {
                error.insertAfter(element);
            }
            error.css('color', 'red');
        },

        onkeyup: function (element, event) {
            $(element).valid();
        }
    };

    var educationvalidationobject = {
        rules: {
            Sedu: {
                required: true
            },
            Hedu: {
                required: true
            }
        },
        //For custom messages
        messages: {
            Sedu: {
                required: "SSC/O is required"
            },
            Hedu: {
                required: "HSC/A is required"
            }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            if (element.attr("type") == "radio") {
                error.insertAfter('#ValidationError');
            } else {
                error.insertAfter(element);
            }
            error.css('color', 'red');
        }
    };

    var hscvalidationobject = {
        rules: {
            txtYearOfPass: {
                required: true,
                regx: /^[\d]+$/,
                minlength: 4,
                maxlength: 4
            },
            txtCGPA: {
                required: true,
                regx: /^[0-5]\.\d\d$|^1st$|^2nd$|^3rd$/,
                //max: 5.00
            },
            txtInstitute: {
                required: true,
                regx: /^[A-z\s,'/-\d&\.]+$/,
                minlength: 4,
                maxlength: 150
            },
            ddlHSCBoard: { required: true }
        },

        messages: {
            txtYearOfPass: {
                required: "Enter year",
                regx: "Digits only",
                minlength: "At least 4 digit",
                maxlength: "Maximum 4 digit"
            },
            txtCGPA: {
                required: "Enter your CGPA or Division/Class",
                regx: "CGPA with two decimal places or 1st to 3rd",
                //max: "Upto 5.00 is allowed"
            },
            txtInstitute: {
                required: "Enter your institute's name",
                regx: "Alphabets space, comma, dash, period and back-slash only",
                minlength: "At least 4 digit",
                maxlength: "Maximum 4 digit"
            },
            ddlHSCBoard: {
                required: "Select board"
            }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
            error.css('color', 'red');
        },

        onkeyup: function (element, event) {
            $(element).valid();
        }
    };

    var sscvalidationobject = {
        rules: {
            txtYearOfPass: {
                required: true,
                regx: /^[\d]+$/,
                minlength: 4,
                maxlength: 4
            },
            txtCGPA: {
                required: true,
                regx: /^[0-5]\.\d\d$|^1st$|^2nd$|^3rd$/,
                //max: 5.00
            },
            txtInstitute: {
                required: true,
                regx: /^[A-z\s,'/-\d&\.]+$/,
                minlength: 4,
                maxlength: 150
            },
            ddlSSCBoard: { required: true }
        },

        messages: {
            txtYearOfPass: {
                required: "Enter year",
                regx: "Digits only",
                minlength: "At least 4 digit",
                maxlength: "Maximum 4 digit"
            },
            txtCGPA: {
                required: "Enter your CGPA or Division/Class",
                regx: "CGPA with two decimal places or 1st to 3rd",
                //max: "Upto 5.00 is allowed"
            },
            txtInstitute: {
                required: "Enter your institute's name",
                regx: "Alphabets space, comma, dash, period and back-slash only",
                minlength: "At least 4 digit",
                maxlength: "Maximum 4 digit"
            },
            ddlSSCBoard: {
                required: "Select board"
            }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
            error.css('color', 'red');
        },

        onkeyup: function (element, event) {
            $(element).valid();
        }
    };

    var olevelvalidationobject = {
        rules: {
            txtYearOfPass: {
                required: true,
                regx: /^[\d]+$/,
                minlength: 4,
                maxlength: 4
            },
            txtInstitute: {
                required: true,
                regx: /^[A-z\s,/-\d&\.]+$/,
                minlength: 4,
                maxlength: 150
            },
            ddlOBoard: { required: true }
        },
        messages: {
            txtYearOfPass: {
                required: "Enter year",
                regx: "Digits only",
                minlength: "At least 4 digit",
                maxlength: "Maximum 4 digit"
            },
            txtInstitute: {
                required: "Enter your institute's name",
                regx: "Alphabets space, comma, dash, period and back-slash only",
                minlength: "At least 4 character",
                maxlength: "Maximum 150 character"
            },
            ddlOBoard: {
                required: "Select Board"
            }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
            error.css('color', 'red');
        },
        onkeyup: function (element, event) {
            $(element).valid();
        }
    };

    var alevelvalidationobject = {
        rules: {
            txtYearOfPass: {
                required: true,
                regx: /^[\d]+$/,
                minlength: 4,
                maxlength: 4
            },
            txtInstitute: {
                required: true,
                regx: /^[A-z\s,/-\d&\.]+$/,
                minlength: 4,
                maxlength: 150
            },
            ddlABoard: { required: true }
        },
        messages: {
            txtYearOfPass: {
                required: "Enter year",
                regx: "Digits only",
                minlength: "At least 4 digit",
                maxlength: "Maximum 4 digit"
            },
            txtInstitute: {
                required: "Enter your institute's name",
                regx: "Alphabets space, comma, dash, period and back-slash only",
                minlength: "At least 4 character",
                maxlength: "Maximum 150 character"
            },
            ddlABoard: {
                required: "Select Board"
            }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
            error.css('color', 'red');
        },
        onkeyup: function (element, event) {
            $(element).valid();
        }
    };

    var bachelorvalidationobject = {
        rules: {
            txtYearOfPass: {
                required: true,
                regx: /^[\d]+$/,
                minlength: 4,
                maxlength: 4
            },
            txtCGPA: {
                required: true,
                regx: /^[0-4]\.\d\d$|^1st$|^2nd$|^3rd$/,
                //max: 4.00
            },
            txtInstitute: {
                required: true,
                regx: /^[A-z\s,/-\d&\.]+$/,
                minlength: 4,
                maxlength: 150
            },
            BachelorddlType: { required: true },
            BachelorddlTitle: { required: true },
            ddlBachelorUni: { required: true }
        },

        messages: {
            txtYearOfPass: {
                required: "Enter year",
                regx: "Digits only",
                minlength: "At least 4 digit",
                maxlength: "Maximum 4 digit"
            },
            txtCGPA: {
                required: "Enter your CGPA",
                regx: "0 to 4 with two decimal places",
                //max: "upto 4.00 is allowed"
            },
            txtInstitute: {
                required: "Enter your institute's name",
                regx: "Alphabets space, comma, dash, period and back-slash only",
                minlength: "At least 4 digit",
                maxlength: "Maximum 4 digit"
            },
            BachelorddlType: {
                required: "Select type"
            },
            BachelorddlTitle: {
                required: "Select title"
            },
            ddlBachelorUni: {
                required: "Select University"
            }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
            error.css('color', 'red');
        },

        onkeyup: function (element, event) {
            $(element).valid();
        }
    };

    var mastervalidationobject = {
        rules: {
            txtYearOfPass: {
                required: true,
                regx: /^[\d]+$/,
                minlength: 4,
                maxlength: 4
            },
            txtCGPA: {
                required: true,
                regx: /^[0-4]\.\d\d$|^1st$|^2nd$|^3rd$/,
                //max: 4.00
            },
            txtInstitute: {
                required: true,
                regx: /^[A-z\s,/-\d&\.]+$/,
                minlength: 4,
                maxlength: 150
            },
            MasterddlType: { required: true },
            MasterddlTitle: { required: true },
            ddlMasterUni: { required: true }
        },

        messages: {
            txtYearOfPass: {
                required: "Enter year",
                regx: "Digits only",
                minlength: "At least 4 digit",
                maxlength: "Maximum 4 digit"
            },
            txtCGPA: {
                required: "Enter your CGPA",
                regx: "0 to 4 with two decimal places",
                //max: "upto 4.00 is allowed"
            },
            txtInstitute: {
                required: "Enter your institute's name",
                regx: "Alphabets space, comma, dash, period and back-slash only",
                minlength: "At least 4 digit",
                maxlength: "Maximum 4 digit"
            },
            MasterddlType: {
                required: "Select type"
            },
            MasterddlTitle: {
                required: "Select title"
            },
            ddlMasterUni: {
                required: "Select University"
            }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
            error.css('color', 'red');
        },

        onkeyup: function (element, event) {
            $(element).valid();
        }
    };

    var professionalvalidationobject = {
        rules: {
            txtYearOfPass: {
                required: true,
                regx: /^[\d]+$/,
                minlength: 4,
                maxlength: 4
            },
            txtInstitute: {
                required: true,
                regx: /^[A-z\s,/-\d&\.]+$/,
                minlength: 4,
                maxlength: 150
            }
        },

        messages: {
            txtYearOfPass: {
                required: "Enter year",
                regx: "Digits only",
                minlength: "At least 4 digit",
                maxlength: "Maximum 4 digit"
            },

            txtInstitute: {
                required: "Enter your institute's name",
                regx: "Alphabets space, comma, dash, period and back-slash only",
                minlength: "At least 4 character",
                maxlength: "Maximum 150 character"
            }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
            error.css('color', 'red');
        },

        onkeyup: function (element, event) {
            $(element).valid();
        }
    };

    var registrationvalidationobject = {
        rules: {
            txtDateOfRegistration: {
                required: true,
            },
            ddlSelectManager: {
                required: true
            },
            ddlSelectPartner: {
                required: true
            },
        },

        messages: {
            txtDateOfRegistration: {
                required: "Select date"
            },
            ddlSelectManager: {
                required: "Choose"
            },
            ddlSelectPartner: {
                required: "Choose"
            }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
            error.css('color', 'red');
        },

        onkeyup: function (element, event) {
            $(element).valid();
        }
    };

    var registrationnovalidation = {
        rules: {
            txtRegistrationNo: {
                required: true,
            },
            ddlPeriodOfArt:{
                required: true,
            }
        },

        messages: {
            txtRegistrationNo: {
                required: "Enter Registration No."
            },
            ddlPeriodOfArt: {
                required: "Choose"
            }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
            error.css('color', 'red');
        },

        onkeyup: function (element, event) {
            $(element).valid();
        }
    };

    var joiningdatevalidation = {
        rules: {
            txtInitUserName: {
                required: true,
                regx: /^[A-z\-\d]+$/,
                minlength: 1,
                maxlength: 50
            },
            txtInitPassword: {
                required: true,
                regx: /^[A-z\-\d]+$/,
                minlength: 1,
                maxlength: 50
            },
            txtJoiningDate: {
                required: true,
            }
        },

        messages: {
            txtInitUserName: {
                required: "Enter a Username",
                regx: "Alphanumeric and space only",
                minlength: "At least 1 character",
                maxlength: "Maximum 50 character"
            },
            txtInitPassword: {
                required: "Enter a Password",
                regx: "Alphanumeric and space only",
                minlength: "At least 1 character",
                maxlength: "Maximum 50 character"
            },
            txtJoiningDate: {
                required: "Enter Registration No."
            }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
            error.css('color', 'red');
        },

        onkeyup: function (element, event) {
            $(element).valid();
        }
    };

    $('body').on('change', 'input[name=Sedu]', function () {
        if ($(this).val() == 'SSC') {
            $('#School').empty();
            $('#School').load('/Education/PartialSSC', function () {
                $('#SSCBoard').material_select();
                $('#SSCForm').validate(sscvalidationobject);
            });

        }
        else {
            $('#School').empty();
            $('#School').load('/Education/PartialO', function () {
                $('#OBoard').material_select();
                $('.tooltipped').tooltip({ delay: 50 });
                $('#OForm').validate(olevelvalidationobject);
                $("[name^=txtOSubject]").each(function () {
                    $(this).rules("add", {
                        required: true,
                        regx: /^[A-z\s\.]+$/,
                        minlength: 4,
                        maxlength: 20,
                        messages: {
                            required: "Subject name",
                            regx: "Alphabet, space and period only",
                            minlength: "At least 4 character",
                            maxlength: "Maximum 20 character"
                        }
                    });
                });
                $("[name^=txtOGrade]").each(function () {
                    $(this).rules("add", {
                        required: true,
                        regx: /[A-E]/,
                        minlength: 1,
                        maxlength: 1,
                        messages: {
                            required: "Grade",
                            regx: "A-E only",
                            minlength: 'One character',
                            maxlength: 'One character'
                        }
                    });
                });
            });
        }
    });

    $('body').on('change', 'input[name=Hedu]', function () {
        if ($(this).val() == 'HSC') {
            $('#College').empty();
            $('#College').load('/Education/PartialHSC', function () {
                $('#HSCBoard').material_select();
                $('#HSCForm').validate(hscvalidationobject);
            })
        }
        else {
            $('#College').empty();
            $('#College').load('/Education/PartialA', function () {
                $('#ABoard').material_select();
                $('.tooltipped').tooltip({ delay: 50 });
                $('#AForm').validate(alevelvalidationobject);
                $("[name^=txtASubject]").each(function () {
                    $(this).rules("add", {
                        required: true,
                        regx: /^[A-z\s\.]+$/,
                        minlength: 4,
                        maxlength: 20,
                        messages: {
                            required: "Subject name",
                            regx: "Alphabet, space and period only",
                            minlength: "At least 4 character",
                            maxlength: "Maximum 20 character"
                        }
                    });
                });
                $("[name^=txtAGrade]").each(function () {
                    $(this).rules("add", {
                        required: true,
                        regx: /[A-E]/,
                        minlength: 1,
                        maxlength: 1,
                        messages: {
                            required: "Grade",
                            regx: "A-E only",
                            minlength: 'One character',
                            maxlength: 'One character'
                        }
                    });
                });
            });
        }
    });

    $('body').on('change', '#Bachelor', function () {
        $('.tooltipped').tooltip('remove');
        if (this.checked) {
            $('#BachelorDegree').empty();

            $('#BachelorDegree').load('/Education/PartialBachelor', function () {
                $('.tooltipped').tooltip({ delay: 50 });
                $('#BachelorType').material_select();
                $('#BachelorTitle').material_select();
                $('#BachelorUniversity').material_select();
                $('#BachelorForm').validate(bachelorvalidationobject);
            });
        }
        else {
            $('#BachelorDegree').empty();
        }
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('change', '#Master', function () {
        $('.tooltipped').tooltip('remove');
        if (this.checked) {
            $('#MasterDegree').empty();

            $('#MasterDegree').load('/Education/PartialMaster', function () {
                $('.tooltipped').tooltip({ delay: 50 });
                $('#MasterType').material_select();
                $('#MasterTitle').material_select();
                $('#MasterUniversity').material_select();
                $('#MasterForm').validate(mastervalidationobject);

            });
        }
        else {
            $('#MasterDegree').empty();
        }
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('change', '#ACCA', function () {
        if (this.checked) {
            $('#ACCAPro').empty();
            $('#ACCAPro').load('/Education/PartialACCA', function () {
                $('#ACCAForm').validate(professionalvalidationobject);
            });
        }
        else {
            $('#ACCAPro').empty();
        }
    });

    $('body').on('change', '#CMA', function () {
        if (this.checked) {
            $('#CMAPro').empty();
            $('#CMAPro').load('/Education/PartialCMA', function () {
                $('#CMAForm').validate(professionalvalidationobject);
            });
        }
        else {
            $('#CMAPro').empty();
        }
    });

    $('body').on('click', '#btnApply', function () {
        $('body').find('div.material-tooltip').remove();
        $('#mainContent').empty();
        $('#spinner').show();
        $('#mainContent').load('/Basic/Index', function () {
            $('select').material_select();
            $('#DateOfBirth').pickadate({
                selectMonths: true,
                selectYears: 25,
                min: new Date(1980, 12, 16),
                max: new Date(2005, 12, 16)
            });
            $('#BasicForm').validate(basicvalidationobject);
            $('#spinner').hide();
            $('.tooltipped').tooltip({ delay: 50 });
        });
    });

    function readPath(input) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#Photo').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $('body').on('change', '#txtUploadFile', function (e) {
        //$("#Photo").removeAttr('src');
        readPath(this);
        var files = e.target.files;

        //var myID = 3; //uncomment this to make sure the ajax URL works 
        if (files.length > 0) {
            if (window.FormData !== undefined) {
                var data = new FormData();
                for (var x = 0; x < files.length; x++) {
                    data.append("file" + x, files[x]);
                }

                $.ajax({
                    type: "POST",
                    url: '/Application/UploadPhoto',
                    contentType: false,
                    processData: false,
                    data: data,
                    success: function (result) {
                        //$("#Photo").attr("src", "/TempPhoto/" + result);
                    },
                    error: function (xhr, status, p3, p4) {
                        var err = "Error " + " " + status + " " + p3 + " " + p4;
                        if (xhr.responseText && xhr.responseText[0] == "{")
                            err = JSON.parse(xhr.responseText).Message;
                        console.log(err);
                    }
                });
            } else {
                alert("This browser doesn't support HTML5 file uploads!");
            }
        }
    });

    $('body').on('click', '#btnSubmitCV', function () {
        $('.tooltipped').tooltip('remove');
        if ($('#PhotoForm').valid()) {
            $.ajax({
                type: "POST",
                url: '/Application/SubmitCV',
                //contentType: false,
                //processData: false,
                //data: data,
                success: function (result) {
                    //$("#Photo").attr("src", result);
                    if (result == 'Inserted') {
                        $('#mainContent').empty();
                        $('#spinner').show();
                        $('#mainContent').load('/ThankYou/Index', function () {
                            $('#spinner').hide();
                            $('#DBInfo').html("Your CV is in Database");
                        });
                    }
                    else {
                        $('#mainContent').empty();
                        $('#spinner').show();
                        $('#mainContent').load('/ThankYou/Index', function () {
                            $('#spinner').hide();
                            $('#DBInfo').html(result);
                        });
                    }
                },
                error: function (xhr, status, p3, p4) {
                    //error
                }
            });
        }
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '#btnNexttoBasic', function () {
        $('body').find('div.material-tooltip').remove();
        if ($('#BasicForm').valid()) {
            Student.Name = $('#Name').val();
            Student.FatherName = $('#FatherName').val();
            Student.MotherName = $('#MotherName').val();
            Student.Religion = $('#Religion').val();
            Student.Gender = $('#Gender').val();
            Student.MaritalStatus = $('#MaritalStatus').val();
            Student.Nationality = $('#Nationality').val();
            Student.DateOfBirth = $('#DateOfBirth').val();
            Student.Blood = $('#Blood').val();

            $('#mainContent').empty();
            $('#spinner').show();
            $('#mainContent').load('/Basic/Contact', function () {
                $('#ContactForm').validate(contactvalidationobject);
                $('#spinner').hide();
                $('.tooltipped').tooltip({ delay: 50 });
            });
        }
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '#btnNexttoContact', function () {
        $('body').find('div.material-tooltip').remove();
        if ($('#ContactForm').valid()) {
            Student.ContactNo = $('#ContactNo').val();
            Student.Email = $('#Email').val();
            Student.PresentAddress = $('#PresentAddress').val();
            Student.PermanentAddress = $('#PermanentAddress').val();
            Student.EmergencyContactNo = $('#EmergencyContactNo').val();
            Student.RelationWithEmergencyContact = $('#RelationEmergencyContact').val();

            $('#mainContent').empty();
            $('#spinner').show();
            $('#mainContent').load('/Education/Index', function () {
                $('#EducationForm').validate(educationvalidationobject);
                $('#spinner').hide();
                $('.tooltipped').tooltip({ delay: 50 });
            });
        }
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '#btnNexttoEducation', function () {
        $('body').find('div.material-tooltip').remove();
        var forms = $('form');
        var validity = "";
        forms.each(function () {
            if (!$(this).valid()) {
                validity = 'invalid';
            }
        });
        if (validity != 'invalid') {
            if ($('input[name="Sedu"]:checked').val() == 'SSC') {
                Student.SSC.Board = $('#SSCBoard').val();
                Student.SSC.YearOfPass = $('#SSCYearOfPass').val();
                Student.SSC.CGPA = $('#SSCCGPA').val();
                Student.SSC.Institute = $('#SSCInstitute').val();
            }
            else {
                Student.OLevel.Board = $('#OBoard').val();
                Student.OLevel.YearOfPass = $('#OYearOfPass').val();
                Student.OLevel.Institute = $('#OInstitute').val();
                var subjects = $('[title="OSubjects"]');
                for (var i = 0; i < subjects.length; i++) {
                    Student.OLevel.Subjects[i] = {
                        Name: $(subjects[i]).find('[title="OSubject"]').val(),
                        Grade: $(subjects[i]).find('[title="OGrade"]').val()
                    };
                }
            }

            if ($('input[name="Hedu"]:checked').val() == 'HSC') {
                Student.HSC.Board = $('#HSCBoard').val();
                Student.HSC.YearOfPass = $('#HSCYearOfPass').val();
                Student.HSC.CGPA = $('#HSCCGPA').val();
                Student.HSC.Institute = $('#HSCInstitute').val();
            }
            else {
                Student.ALevel.Board = $('#ABoard').val();
                Student.ALevel.YearOfPass = $('#AYearOfPass').val();
                Student.ALevel.Institute = $('#AInstitute').val();
                var subjects = $('[title="ASubjects"]');
                for (var i = 0; i < subjects.length; i++) {
                    Student.ALevel.Subjects[i] = {
                        Name: $(subjects[i]).find('[title="ASubject"]').val(),
                        Grade: $(subjects[i]).find('[title="AGrade"]').val()
                    };
                }
            }

            var pudu = $('input[type="checkbox"]:checked');
            if (pudu.length > 0) {
                pudu.each(function () {
                    if ($(this).val() == 'Bachelor') {
                        Student.Bachelor.Type = $('#BachelorType').val();
                        Student.Bachelor.Title = $('#BachelorTitle').val();
                        Student.Bachelor.Major = $('#BachelorMajor').val();
                        Student.Bachelor.YearOfPass = $('#BachelorYearOfPass').val();
                        Student.Bachelor.CGPA = $('#BachelorCGPA').val();
                        Student.Bachelor.Institute = $('#BachelorInstitute').val();
                        Student.Bachelor.University = $('#BachelorUniversity').val();
                    }
                    else if ($(this).val() == 'Master') {
                        Student.Master.Type = $('#MasterType').val();
                        Student.Master.Title = $('#MasterTitle').val();
                        Student.Master.Major = $('#MasterMajor').val();
                        Student.Master.YearOfPass = $('#MasterYearOfPass').val();
                        Student.Master.CGPA = $('#MasterCGPA').val();
                        Student.Master.Institute = $('#MasterInstitute').val();
                        Student.Master.University = $('#MasterUniversity').val();
                    }
                    else if ($(this).val() == 'ACCA') {
                        Student.ACCA.Institute = $('#ACCAInstitute').val();
                        Student.ACCA.YearOfPass = $('#ACCAYearOfPass').val();
                    }
                    else if ($(this).val() == 'CMA') {
                        Student.CMA.Institute = $('#CMAInstitute').val();
                        Student.CMA.YearOfPass = $('#CMAYearOfPass').val();
                    }
                });
            }

            $('#mainContent').empty();
            $('#spinner').show();
            $('#mainContent').load('/Basic/Reference', function () {
                $('#spinner').hide();
                $('.tooltipped').tooltip({ delay: 50 });
                $("#Reference1").validate(referencevalidationobject);
            });
        }
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '#AppliedforRegistration', function () {
        $('body').find('div.material-tooltip').remove();
        var StudentId = { Id: $(this).val() };
        $.ajax({
            url: '/AdminsBoard/GetSupervisingHistory',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(StudentId),
            contentType: 'application/json; charset=utf-8',
            success: function (result) {
                if ($('#PromoteDiv').find('#RegistrationNoForm').length == 0) {
                    $('#PromoteDiv').empty();
                    //$('#Adminspinner').show();
                    $('#PromoteDiv').load('/AdminsBoard/UpdateRegistrationNo', function () {
                        //$('#Adminspinner').hide();
                        $('#PeriodOfArt').material_select();
                        $('#RegistrationNoForm').validate(registrationnovalidation);
                        $('.tooltipped').tooltip({ delay: 50 });
                    });
                }
            },
            error: function (xhr, status, p3, p4) {
                var err = "Error " + " " + status + " " + p3 + " " + p4;
                if (xhr.responseText && xhr.responseText[0] == "{")
                    err = JSON.parse(xhr.responseText).Message;
                console.log(err);
            }
        });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '#btnUpdateRegistrationNo', function () {
        $('body').find('div.material-tooltip').remove();
        if ($('#RegistrationNoForm').valid()) {
            var RegistrationNo = {
                Id: $('#btnUpdateRegistrationNo').val(),
                RegNo: $('#RegistrationNo').val(),
                Period: $('#PeriodOfArt').val()
            };

            $.ajax({
                url: '/AdminsBoard/ReadyRegistrationNo',
                type: 'POST',
                data: JSON.stringify(RegistrationNo),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    if (data == "Updated") {
                        $('#mainContent').empty();
                        $('#spinner').show();
                        $('#mainContent').load('/AdminsBoard/Index', function () {
                            $('#spinner').hide();
                        });
                    } else {
                        $('#errorMsg').html(data);
                    }
                },
                error: function (err) {
                    alert(err);
                }
            });
        }
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '#btnUpdateRegistration', function () {
        $('body').find('div.material-tooltip').remove();
        if ($('#StudentRegistrationForm').valid()) {
            var HRSupervisory = {
                Id: $('#btnUpdateRegistration').val(),
                PartnerId: $('#SelectPartner').val(),
                ManagerId: $('#SelectManager').val(),
                From: $('#DateOfRegistration').val()
            };

            $.ajax({
                url: '/AdminsBoard/ReadyRegistration',
                type: 'POST',
                data: JSON.stringify(HRSupervisory),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    if (data == "Updated") {
                        $('#mainContent').empty();
                        $('#spinner').show();
                        $('#mainContent').load('/AdminsBoard/Index', function () {
                            $('#spinner').hide();
                        });
                    } else {
                        $('#errorMsg').html(data);
                    }
                },
                error: function (err) {
                    alert(err);
                }
            });
        }
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '#btnApply4Reg', function () {
        $('body').find('div.material-tooltip').remove();
        var StudentId = { Id: $(this).val() };
        $.ajax({
            url: '/AdminsBoard/GetRegistrationInfo',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(StudentId),
            contentType: 'application/json; charset=utf-8',
            success: function (result) {
                if ($('#PromoteDiv').find('#StudentRegistrationForm').length == 0) {
                    $('#PromoteDiv').empty();
                    //$('#Adminspinner').show();
                    $('#PromoteDiv').load('/AdminsBoard/RegistrationInfo', function () {
                        // $('#Adminspinner').hide();
                        $('#SelectPartner').material_select();
                        $('#SelectManager').material_select();
                        $('#DateOfRegistration').pickadate({
                            selectMonths: true,
                            selectYears: 25,
                            min: new Date(1980, 12, 16),
                            max: new Date(2005, 12, 16)
                        });

                        $('#StudentRegistrationForm').validate(registrationvalidationobject);
                        $('.tooltipped').tooltip({ delay: 50 });
                    });
                }
            },
            error: function (xhr, status, p3, p4) {
                var err = "Error " + " " + status + " " + p3 + " " + p4;
                if (xhr.responseText && xhr.responseText[0] == "{")
                    err = JSON.parse(xhr.responseText).Message;
                console.log(err);
            }
        });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '#btnNexttoReference', function () {
        $('body').find('div.material-tooltip').remove();
        var validity = '';
        $('form').each(function () {
            if (!$(this).valid()) {
                validity = 'invalid';
            }
        });

        if (validity != 'invalid') {
            var References = $('[title="Reference"]');
            for (var i = 0; i < References.length; i++) {
                Student.Reference[i] = {
                    Name: $(References[i]).find('[title="ReferenceName"]').val(),
                    Designation: $(References[i]).find('[title="ReferenceDesignation"]').val(),
                    Organisation: $(References[i]).find('[title="OrganisationAddress"]').val(),
                    ContactNo: $(References[i]).find('[title="ReferenceContactNo"]').val(),
                    Relation: $(References[i]).find('[title="ReferenceRelation"]').val()
                };
            }

            $('#mainContent').empty();
            $('#spinner').show();
            $('#mainContent').load('/Objective/Index', function () {
                $('#spinner').hide();
                $('#ObjectiveForm').validate(objectivevalidationobject);
                $('.tooltipped').tooltip({ delay: 50 });
            });
        }

    });

    $('body').on('change', 'input[name=SeekType]', function () {
        if ($('input[name="SeekType"]:checked').val() == 'Job') {
            $('#MembersDetail').empty();
            Student.ApplicationFor = "Job";
            $('#ExperienceCheck1').load('/Objective/WorkExperience', function () {
                $('#WorkingExperience').validate(ExperienceRadioValidation);
            });
        }
        else if ($('input[name="SeekType"]:checked').val() == 'PartnerProfile') {
            $('body').find('div.material-tooltip').remove();
            Student.ApplicationFor = "Partner";
            $('#ExperienceCheck1').empty();
            $('#ExperienceCheck2').empty();
            $('#CurrentJobDetail2').empty();
            $('#MembersDetail').load('/Objective/PartnerExperience', function () {
                $('#Memddl1').material_select();
                $('#Membership1').validate(membershipValidationObject);
                $('#Memddl1').rules("add", {
                    required: true,
                    messages: {
                        required: "Choose"
                    }
                });
                $('.tooltipped').tooltip({ delay: 50 });
            });
        }
        else {
            Student.ApplicationFor = "ArticleShip";
            $('#MembersDetail').empty();
            $('#ExperienceCheck1').empty();
            $('#ExperienceCheck2').empty();
            $('#CurrentJobDetail1').empty();
            $('#CurrentJobDetail2').empty();
            $('#PastPositionDiv').empty();
            $('#CurrentPositionDiv').empty();
        }
    });

    $('body').on('change', '#memPastPosition', function () {
        $('body').find('div.material-tooltip').remove();
        if (this.checked) {
            $('#PastPositionDiv').load('/Objective/PastPosition', function () {
                $('[title="PastPositionFrom"]').pickadate({
                    selectMonths: true,
                    selectYears: 25,
                    min: new Date(1980, 12, 16),
                    max: new Date(2005, 12, 16)
                });
                $('[title="PastPositionTo"]').pickadate({
                    selectMonths: true,
                    selectYears: 25,
                    min: new Date(1980, 12, 16),
                    max: new Date(2005, 12, 16)
                });
                $('#PastPosition1').validate(memberPastPositionValidation);
                $('.tooltipped').tooltip({ delay: 50 });
            });
        }
        else {
            $('#PastPositionDiv').empty();
        }
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('change', '#memCurrentPosition', function () {
        $('body').find('div.material-tooltip').remove();
        if (this.checked) {
            $('#CurrentPositionDiv').load('/Objective/CurrentPosition', function () {
                $('[title="CurrentPositionFrom"]').pickadate({
                    selectMonths: true,
                    selectYears: 25,
                    min: new Date(1980, 12, 16),
                    max: new Date(2005, 12, 16)
                });
                $('#CurrentPosition1').validate(memberCurrentPositionValidation);
                $('.tooltipped').tooltip({ delay: 50 });
            });
        }
        else {
            $('#CurrentPositionDiv').empty();
        }
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('change', 'input[name=Experience]', function () {
        $('body').find('div.material-tooltip').remove();
        if ($('input[name="Experience"]:checked').val() == 'Experienced') {
            $('#ExperienceCheck2').load('/Objective/Experiences', function () {
                $('[title="ExperienceFrom"]').pickadate({
                    selectMonths: true,
                    selectYears: 25,
                    min: new Date(1980, 12, 16),
                    max: new Date(2005, 12, 16)
                });
                $('[title="ExperienceTo"]').pickadate({
                    selectMonths: true,
                    selectYears: 25,
                    min: new Date(1980, 12, 16),
                    max: new Date(2005, 12, 16)
                });
                $("#Experience1").validate(ExperienceValidationObject);
                $('.tooltipped').tooltip({ delay: 50 });
            });
        }
        else {
            $('#ExperienceCheck2').empty();
        }
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('change', '#CurrentJob', function () {
        if (this.checked) {
            $('#CurrentJobDetail2').empty();

            $('#CurrentJobDetail2').load('/Objective/CurrentJob', function () {
                $('[title="CurrentExperienceFrom"]').pickadate({
                    selectMonths: true,
                    selectYears: 25,
                    min: new Date(1980, 12, 16),
                    max: new Date(2005, 12, 16)
                });
                $('#CurrentJobForm').validate(currentJobValidationObject);
            });
        }
        else {
            $('#CurrentJobDetail2').empty();
        }
    });

    $('body').on('click', '#btnNexttoObjective', function () {
        $('body').find('div.material-tooltip').remove();
        var validity = '';
        $('form').each(function () {
            if (!$(this).valid()) {
                validity = 'invalid';
            }
        });

        if (validity != 'invalid') {
            Student.Objective = $('#Objective').val();

            if ($('input[name="SeekType"]:checked').val() == 'Article') {

                $.ajax({
                    url: '/Application/ApplyFor',
                    type: 'POST',
                    data: JSON.stringify(Student),
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        if (data == "Success") {
                            $('#mainContent').empty();
                            $('#spinner').show();
                            $('#mainContent').load('/Application/Apply', function () {
                                $('#StudentsApplication').validate(jobappvalidationobject);
                                //$('#PhotoForm').validate(photovalidationobject);
                                $('#spinner').hide();
                                $('.tooltipped').tooltip({ delay: 50 });
                            });
                        }
                    },
                    error: function (err) {
                        alert(err);
                    }
                })
            }
            else if ($('input[name="SeekType"]:checked').val() == 'PartnerProfile') {
                var Membership = $('[title="Membership"]');
                for (var i = 0; i < Membership.length; i++) {
                    Student.PartnerMembership[i] = {
                        Id: $(Membership[i]).find('[title="MembershipId"]').val(),
                        Organisation: $(Membership[i]).find('[title="MebersOrg"]').val()
                    };
                }
                if ($('input[name="memCurPos"]:checked')) {
                    var CurrentPos = $('[title="PartnerCurrentPosition"]');
                    for (var i = 0; i < CurrentPos.length; i++) {
                        Student.PartnerCurrentPosition[i] = {
                            Position: $(CurrentPos[i]).find('[title="CurrentPosition"]').val(),
                            Organisation: $(CurrentPos[i]).find('[title="CurrentOrganisation"]').val(),
                            From: $(CurrentPos[i]).find('[title="CurrentPositionFrom"]').val()
                        };
                    }
                }

                if ($('input[name="memPasPos"]:checked')) {
                    var PastPos = $('[title="PartnerPastPosition"]');
                    for (var i = 0; i < PastPos.length; i++) {
                        Student.PartnerPastPosition[i] = {
                            Position: $(PastPos[i]).find('[title="PastPosition"]').val(),
                            Organisation: $(PastPos[i]).find('[title="PastOrganisation"]').val(),
                            From: $(PastPos[i]).find('[title="PastPositionFrom"]').val(),
                            To: $(PastPos[i]).find('[title="PastPositionTo"]').val()
                        };
                    }
                }

                $.ajax({
                    url: '/Application/SubmitApplication',
                    type: 'POST',
                    data: JSON.stringify(Student),
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        if (data == 'Success') {
                            $('#mainContent').empty();
                            $('#spinner').show();
                            $('#mainContent').load('/Application/Index', function () {
                                $('#PhotoForm').validate(photovalidationobject);
                                $('#spinner').hide();
                                $('.tooltipped').tooltip({ delay: 50 });
                            });
                        }
                    },
                    error: function (err) {
                        alert(err);
                    }
                });
            }
            else {
                if ($('input[name="CurrentJob"]:checked')) {
                    Student.CurrentJob.Position = $('[title="CurrentPosition"]').val();
                    Student.CurrentJob.Organisation = $('[title="CurrentOrganisation"]').val();
                    Student.CurrentJob.From = $('[title="CurrentExperienceFrom"]').val();
                    Student.CurrentJob.Responsibilities = $('[title="CurrentResponsibilities"]').val();
                }

                if ($('input[name="Experience"]:checked').val() == 'NotExperienced') {
                    //this is same as previous block, make it a function

                    $.ajax({
                        url: '/Application/ApplyFor',
                        type: 'POST',
                        data: JSON.stringify(Student),
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        success: function (data) {
                            if (data == "Success") {
                                $('#mainContent').empty();
                                $('#spinner').show();
                                $('#mainContent').load('/Application/Apply', function () {
                                    $('#StudentsApplication').validate(jobappvalidationobject);
                                    //$('#PhotoForm').validate(photovalidationobject);
                                    $('#spinner').hide();
                                    $('.tooltipped').tooltip({ delay: 50 });
                                });
                            }
                        },
                        error: function (err) {
                            alert(err);
                        }
                    });
                }
                else {
                    var Experiences = $('[title="Experience"]');
                    for (var i = 0; i < Experiences.length; i++) {
                        Student.Experiences[i] = {
                            Position: $(Experiences[i]).find('[title="Position"]').val(),
                            Organisation: $(Experiences[i]).find('[title="Organisation"]').val(),
                            From: $(Experiences[i]).find('[title="ExperienceFrom"]').val(),
                            To: $(Experiences[i]).find('[title="ExperienceTo"]').val(),
                            Responsibilities: $(Experiences[i]).find('[title="Responsibilities"]').val()
                        };
                    }

                    $.ajax({
                        url: '/Application/ApplyFor',
                        type: 'POST',
                        data: JSON.stringify(Student),
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        success: function (data) {
                            if (data == "Success") {
                                $('#mainContent').empty();
                                $('#spinner').show();
                                $('#mainContent').load('/Application/Apply', function () {
                                    $('#StudentsApplication').validate(jobappvalidationobject);
                                    //$('#PhotoForm').validate(photovalidationobject);
                                    $('#spinner').hide();
                                    $('.tooltipped').tooltip({ delay: 50 });
                                });
                            }

                        },
                        error: function (err) {
                            alert(err);
                        }
                    });

                    //$.ajax({
                    //    url: '/Application/SubmitApplication',
                    //    type: 'POST',
                    //    data: JSON.stringify(Student),
                    //    dataType: 'json',
                    //    contentType: 'application/json; charset=utf-8',
                    //    success: function (data) {
                    //        if (data == 'Success') {
                    //            $('#mainContent').empty();
                    //            $('#spinner').show();
                    //            $('#mainContent').load('/Application/Index', function () {
                    //                $('#PhotoForm').validate(photovalidationobject);
                    //                $('#spinner').hide();
                    //            });
                    //        }
                    //    },
                    //    error: function (err) {
                    //        alert(err);
                    //    }
                    //});
                }
            }

        }
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '#SubmitJobApp', function () {
        $('body').find('div.material-tooltip').remove();
        if ($('#StudentsApplication').valid()) {
            Student.AppSubject = $('#AppSubject').val();
            Student.AppBody = $('#txtJobApplicationBody').val();

            $.ajax({
                url: '/Application/SubmitApplication',
                type: 'POST',
                data: JSON.stringify(Student),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    if (data == 'Success') {
                        $('#mainContent').empty();
                        $('#spinner').show();
                        $('#mainContent').load('/Application/Index', function () {
                            $('#PhotoForm').validate(photovalidationobject);
                            $('#spinner').hide();
                            $('.tooltipped').tooltip({ delay: 50 });
                        });
                    }
                },
                error: function (err) {
                    alert(err);
                }
            });
        }
        $('.tooltipped').tooltip({ delay: 50 });
    });

    var referenceCount = 1;
    $('body').on('click', '#btnAddMoreReference', function () {
        if (referenceCount < 3) {
            referenceCount++;
            var StudentId = { id: referenceCount };
            $.ajax({
                url: '/Basic/MoreReference',
                type: 'POST',
                dataType: 'html',
                data: JSON.stringify(StudentId),
                contentType: 'application/json; charset=utf-8',
                success: function (msg) {
                    $('#ReferenceForm').append(msg);
                    $('#Reference' + referenceCount + '').validate(referencevalidationobject);
                }
            });
        }
    });

    $('body').on('click', '#btnRemoveReference', function () {
        if (referenceCount > 1) {
            $('[title="Reference"]').last().fadeOut(2000, function () {
                $('[title="Reference"]').last().parent().remove();
            });
            referenceCount--;
        }
    });

    var membershipcount = 1;
    $('body').on('click', '#btnAddMoreMembership', function () {
        membershipcount++;
        var StudentId = { id: membershipcount };
        $.ajax({
            url: '/Objective/MoreMembership',
            type: 'POST',
            dataType: 'html',
            data: JSON.stringify(StudentId),
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                $('#PartnerMemberShipForm').append(msg);
                $("#Memddl" + membershipcount).material_select();
                $('#Membership' + membershipcount + '').validate(membershipValidationObject);
                $("#Memddl" + membershipcount).rules("add", {
                    required: true,
                    messages: {
                        required: "Choose"
                    }
                });
            }
        });
    });

    $('body').on('click', '#btnRemoveLastMembership', function () {
        if (membershipcount > 1) {
            $('[title="Membership"]').last().fadeOut(2000, function () {
                $('[title="Membership"]').last().parent().remove();
            });
            membershipcount--;
        }
    });

    var mempastposition = 1;
    $('body').on('click', '#btnAddMorePastPosition', function () {
        mempastposition++;
        var StudentId = { id: mempastposition };
        $.ajax({
            url: '/Objective/MemberMorePastPosition',
            type: 'POST',
            dataType: 'html',
            data: JSON.stringify(StudentId),
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                $('#PastPositionForm').append(msg);
                $('[title="PastPositionFrom"]').pickadate({
                    selectMonths: true,
                    selectYears: 25,
                    min: new Date(1980, 12, 16),
                    max: new Date(2005, 12, 16)
                });
                $('[title="PastPositionTo"]').pickadate({
                    selectMonths: true,
                    selectYears: 25,
                    min: new Date(1980, 12, 16),
                    max: new Date(2005, 12, 16)
                });

                $('#PastPosition' + mempastposition + '').validate(memberPastPositionValidation);
            }
        });
    });

    $('body').on('click', '#btnRemovePastPosition', function () {
        if (mempastposition > 1) {
            $('[title="PartnerPastPosition"]').last().fadeOut(2000, function () {
                $('[title="PartnerPastPosition"]').last().parent().remove();
            });
            mempastposition--;
        }
    });

    var memcurrentposition = 1;
    $('body').on('click', '#btnAddMoreCurrentPosition', function () {
        memcurrentposition++;
        var StudentId = { id: memcurrentposition };
        $.ajax({
            url: '/Objective/MemberMoreCurrentPosition',
            type: 'POST',
            dataType: 'html',
            data: JSON.stringify(StudentId),
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                $('#MemberCurrentForm').append(msg);
                $('[title="CurrentPositionFrom"]').pickadate({
                    selectMonths: true,
                    selectYears: 25,
                    min: new Date(1980, 12, 16),
                    max: new Date(2005, 12, 16)
                });

                $('#CurrentPosition' + memcurrentposition + '').validate(memberCurrentPositionValidation);
            }
        });
    });

    $('body').on('click', '#btnRemoveCurrentPosition', function () {
        if (memcurrentposition > 1) {
            $('[title="PartnerCurrentPosition"]').last().fadeOut(2000, function () {
                $('[title="PartnerCurrentPosition"]').last().parent().remove();
            });
            memcurrentposition--;
        }
    });

    var experiencecount = 1;
    $('body').on('click', '#btnAddMoreExperience', function () {
        experiencecount++;
        var StudentId = { id: experiencecount };
        $.ajax({
            url: '/Objective/MoreExperience',
            type: 'POST',
            dataType: 'html',
            data: JSON.stringify(StudentId),
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                $('#ExperienceForm').append(msg);
                $('[title="ExperienceFrom"]').pickadate({
                    selectMonths: true,
                    selectYears: 25,
                    min: new Date(1980, 12, 16),
                    max: new Date(2005, 12, 16)
                });
                $('[title="ExperienceTo"]').pickadate({
                    selectMonths: true,
                    selectYears: 25,
                    min: new Date(1980, 12, 16),
                    max: new Date(2005, 12, 16)
                });
                $('#Experience' + experiencecount + '').validate(ExperienceValidationObject);
            }
        });
    });

    $('body').on('click', '#btnRemoveExperience', function () {
        if (experiencecount > 1) {
            $('[title="Experience"]').last().fadeOut(2000, function () {
                $('[title="Experience"]').last().parent().remove();
            });
            experiencecount--;
        }
    });

    var osubjectcount = 6;
    $('body').on('click', '#btnAddOSubject', function () {
        osubjectcount++;
        $('body').find('div.material-tooltip').remove();
        $('#subjects').append(
            `<div title="OSubjects">
                <div class="input-field col s4">
                    <label for="txtOSubject">Subject*</label>`
                    + '<input title="OSubject" name="txtOSubject[' + osubjectcount + ']" type="text">' +
                `</div>
                <div class="input-field col s2">
                    <label for="txtOGrade">Grade*</label>`
                    + '<input title="OGrade" name="txtOGrade[' + osubjectcount + ']" type="text">' +
                `</div>
            </div>`
            );
        $('[title="OSubject"]').last().rules("add", {
            required: true,
            regx: /^[A-z\s\.]+$/,
            minlength: 4,
            maxlength: 20,
            messages: {
                required: "Subject name",
                regx: "Alphabet, space and period only",
                minlength: "At least 4 character",
                maxlength: "Maximum 20 character"
            }
        });
        $('[title="OGrade"]').last().rules("add", {
            required: true,
            regx: /[A-E]/,
            minlength: 1,
            maxlength: 1,
            messages: {
                required: "Grade",
                regx: "A-E only",
                minlength: 'One character',
                maxlength: 'One character'
            }
        });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '#btnRemoveOSubject', function () {
        $('body').find('div.material-tooltip').remove();
        if (osubjectcount > 6) {
            $('div[title="OSubjects"]').last().remove();
            osubjectcount--;
        }
        $('.tooltipped').tooltip({ delay: 50 });
    });

    var asubjectcount = 2;
    $('body').on('click', '#btnAddASubject', function () {
        asubjectcount++;
        $('body').find('div.material-tooltip').remove();
        $('#subject').append(
            `<div title="ASubjects">
                <div class="input-field col s9">
                    <label for="txtASubject">Subject*</label>`
                    + '<input title="ASubject" name="txtASubject[' + asubjectcount + ']" type="text">' +
                `</div>
                <div class="input-field col s3">
                    <label for="txtAGrade">Grade*</label>`
                    + '<input title="AGrade" name="txtAGrade[' + asubjectcount + ']" type="text">' +
                `</div>
            </div>`
            );
        $('[title="ASubject"]').last().rules("add", {
            required: true,
            regx: /^[A-z\s\.]+$/,
            minlength: 4,
            maxlength: 20,
            messages: {
                required: "Subject name",
                regx: "Alphabet, space and period only",
                minlength: "At least 4 character",
                maxlength: "Maximum 20 character"
            }
        });
        $('[title="AGrade"]').last().rules("add", {
            required: true,
            regx: /[A-E]/,
            minlength: 1,
            maxlength: 1,
            messages: {
                required: "Grade",
                regx: "A-E only",
                minlength: 'One character',
                maxlength: 'One character'
            }
        });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '#btnRemoveASubject', function () {
        $('body').find('div.material-tooltip').remove();
        if (asubjectcount > 2) {
            $('div[title="ASubjects"]').last().remove();
            asubjectcount--;
        }
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('nav').on('click', '#navLogin', function () {
        $('body').find('div.material-tooltip').remove();
        $('#mainContent').empty();
        $('#spinner').show();
        $('#mainContent').load('/Account/Login', function () {
            $('#spinner').hide();
            $('.tooltipped').tooltip({ delay: 50 });
        });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '#Add', function () {
        $('#mainContent').empty();
        $('#spinner').show();
        $('#mainContent').load('/AddUser/Index', function () {
            $('#spinner').hide();
        });
    });

    $('body').on('click', '#Update', function () {
        $('#mainContent').empty();
        $('#spinner').show();
        $('#mainContent').load('/ModifyUser/Index', function () {
            $('#spinner').hide();
        });
    });

    $('body').on('click', '#WhoIsWhere', function () {
        $('#mainContent').empty();
        $('#spinner').show();
        $('#mainContent').load('/WhoIsWhere/Index', function () {
            $('#spinner').hide();
        });
    });

    $('body').on('click', '#btnLogin', function () {
        var user = {
            UserName: $('#UserName').val(),
            Password: $('#Password').val()
        };
        $('body').find('div.material-tooltip').remove();
        $.ajax({
            url: '/Account/Authenticate',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(user),
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                if (data == 'Invalid') {
                    $('#message').html('Invalid username and/or password!\n');
                }
                else if (data == 'locked') {
                    $('#message').html('Your account has been locked!\n');
                }
                else {
                    $('#GenNav').empty();
                    if (data == "Administrator") {
                        $('#GenNav').append(
                            `<li>
                                <a class="dropdown-button" data-beloworigin="true" data-activates="dropdown1" >Manage User</a>
                            </li>
                            <li>
                                <ul id="dropdown1" class='dropdown-content'>
                                    <li><a id="Add">Add</a></li>
                                    <li><a id="Update">Update</a></li>
                                    <li><a id="WhoIsWhere">Who is where?</a></li>
                                </ul>
                            </li>
                            <li><a id="AdminPanel">Admin Panel</a></li>
                            <li><a id="navAbout">About</a></li>
                            <li><a id="Logout">Logout</a></li>`
                        );
                        $('.dropdown-button').dropdown();
                        $('#mainContent').empty();
                        $('#spinner').show();
                        $('#mainContent').load('/Home/Index', function () { $('#spinner').hide(); });
                    }
                    else if (data == "Partner") {
                        $('#GenNav').append(
                            `<li><a id="navAbout">About</a></li>
                            <li><a id="Logout">Logout</a></li>`
                        );
                        $('#mainContent').empty();
                        $('#spinner').show();
                        $('#mainContent').load('/PartnersBoard/Index', function () {
                            $('#spinner').hide();
                            $.ajax({
                                url: '/PartnersBoard/ReturnCharts',
                                type: 'GET',
                                dataType: 'json',
                                contentType: 'application/json; charset=utf-8',
                                success: function (data) {
                                    if (data[2].Chart.length > 0) {
                                        $('#StaffsChartDiv').show();
                                        $('#StaffsChart').dxChart({
                                            dataSource: data[2].Chart,
                                            //title:"Staffs",
                                            legend: { visible: false },
                                            tooltip: { enabled: true },
                                            argumentAxis: {
                                                label: {
                                                    overlappingBehavior: 'rotate'
                                                }
                                            },

                                            commonSeriesSettings: {
                                                argumentField: 'DataFieild'
                                            },

                                            series: [
                                                { valueField: 'ValueField1', type: 'bar', axis: 'main', color: '#ef6c00' },
                                                { valueField: 'ValueField2', type: 'line', axis: 'secondary', color: '#03a9f4 ' }
                                            ],
                                            valueAxis: [
                                                { name: 'main', title: 'Your Staff', label: { font: { color: '#ef6c00' } } },
                                                { name: 'secondary', position: 'right', title: "Other's Staff", label: { font: { color: '#03a9f4 ' } } }
                                            ]
                                        });
                                    }
                                    if (data[1].Chart.length > 0) {
                                        $('#DecisionChartDiv').show();
                                        $('#DecisionChart').dxChart({
                                            dataSource: data[1].Chart,
                                            //title:"Staffs",
                                            legend: { visible: false },
                                            tooltip: { enabled: true },
                                            argumentAxis: {
                                                label: {
                                                    overlappingBehavior: 'rotate'
                                                }
                                            },

                                            commonSeriesSettings: {
                                                argumentField: 'DataFieild'
                                            },

                                            series: [
                                                { valueField: 'ValueField1', type: 'bar', axis: 'main', color: '#ef6c00' },
                                                { valueField: 'ValueField2', type: 'line', axis: 'secondary', color: '#03a9f4 ' }
                                            ],
                                            valueAxis: [
                                                { name: 'main', title: "Existing Staff's", label: { font: { color: '#ef6c00' } } },
                                                { name: 'secondary', position: 'right', title: 'Total', label: { font: { color: '#03a9f4 ' } } }
                                            ]
                                        });

                                    }
                                    if (data[0].Chart.length > 0) {
                                        $('#ApplicationChartDiv').show();
                                        $('#ApplicationChart').dxChart({
                                            dataSource: data[0].Chart,
                                            //title:"Staffs",
                                            legend: { visible: false },
                                            tooltip: { enabled: true },
                                            argumentAxis: {
                                                label: {
                                                    overlappingBehavior: 'rotate'
                                                }
                                            },

                                            commonSeriesSettings: {
                                                argumentField: 'DataFieild'
                                            },

                                            series: [
                                                { valueField: 'ValueField1', type: 'bar', axis: 'main', color: '#ef6c00' },
                                                { valueField: 'ValueField2', type: 'line', axis: 'secondary', color: '#03a9f4 ' }
                                            ],
                                            valueAxis: [
                                                { name: 'main', title: "Existing Staff's", label: { font: { color: '#ef6c00' } } },
                                                { name: 'secondary', position: 'right', title: 'Total', label: { font: { color: '#03a9f4 ' } } }
                                            ]
                                        });
                                    }
                                }
                            });
                        });
                    }
                    else if (data == 'Manager') {
                        $('#GenNav').append(
                            `<li><a id="navAbout">About</a></li>
                            <li><a id="Logout">Logout</a></li>`
                        );
                        $('#mainContent').empty();
                        $('#spinner').show();
                        $('#mainContent').load('/ManagersBoard/Index', function () {
                            $('#spinner').hide();
                            $.ajax({
                                url: '/ManagersBoard/ReturnCharts',
                                type: 'GET',
                                dataType: 'json',
                                contentType: 'application/json; charset=utf-8',
                                success: function (data) {

                                    if (data[0].Chart.length > 0) {
                                        $('#StaffsChartDiv').show();
                                        $('#StaffsChart').dxPieChart({
                                            dataSource: data[0].Chart,
                                            legend: {
                                                //verticalAlignment: "bottom",
                                                horizontalAlignment: "center",
                                                itemTextPosition: "bottom"
                                            },
                                            tooltip: { enabled: true },
                                            series: {
                                                argumentField: 'DataFieild',
                                                valueField: 'ValueField1'
                                            },
                                        });
                                    }
                                    if (data[2].Chart.length > 0) {
                                        $('#DecisionChartDiv').show();
                                        $('#DecisionChart').dxChart({
                                            dataSource: data[2].Chart,
                                            //title:"Staffs",
                                            legend: { visible: false },
                                            tooltip: { enabled: true },
                                            argumentAxis: {
                                                label: {
                                                    overlappingBehavior: 'rotate'
                                                }
                                            },

                                            commonSeriesSettings: {
                                                argumentField: 'DataFieild'
                                            },

                                            series: [
                                                { valueField: 'ValueField1', type: 'bar', axis: 'main', color: '#ef6c00' },
                                                { valueField: 'ValueField2', type: 'line', axis: 'secondary', color: '#03a9f4 ' }
                                            ],
                                            valueAxis: [
                                                { name: 'main', title: "Student's Application", label: { font: { color: '#ef6c00' } } },
                                                { name: 'secondary', position: 'right', title: 'Your Application', label: { font: { color: '#03a9f4 ' } } }
                                            ]
                                        });

                                    }
                                    if (data[1].Chart.length > 0) {
                                        $('#ApplicationChartDiv').show();
                                        $('#ApplicationChart').dxChart({
                                            dataSource: data[1].Chart,
                                            //title:"Staffs",
                                            legend: { visible: false },
                                            tooltip: { enabled: true },
                                            argumentAxis: {
                                                label: {
                                                    overlappingBehavior: 'rotate'
                                                }
                                            },

                                            commonSeriesSettings: {
                                                argumentField: 'DataFieild'
                                            },

                                            series: [
                                                { valueField: 'ValueField1', type: 'bar', axis: 'main', color: '#ef6c00' },
                                                { valueField: 'ValueField2', type: 'line', axis: 'secondary', color: '#03a9f4 ' }
                                            ],
                                            valueAxis: [
                                                { name: 'main', title: "Student's Application", label: { font: { color: '#ef6c00' } } },
                                                { name: 'secondary', position: 'right', title: 'Your Application', label: { font: { color: '#03a9f4 ' } } }
                                            ]
                                        });
                                    }
                                }
                            });
                        });
                    }
                    else if (data == "Student") {
                        $('#GenNav').append(
                            `<li><a id="navAbout">About</a></li>
                            <li><a id="Logout">Logout</a></li>`
                        );
                        $('#mainContent').empty();
                        $('#spinner').show();
                        $('#mainContent').load('/StudentsBoard/Index', function () {
                            $('#spinner').hide();
                            $.ajax({
                                url: '/StudentsBoard/ReturnCharts',
                                type: 'GET',
                                dataType: 'json',
                                contentType: 'application/json; charset=utf-8',
                                success: function (data) {
                                    console.log(data);
                                    if (data[1].Chart.length > 0) {
                                        $('#DecisionChartDiv').show();
                                        $('#DecisionChart').dxPieChart({
                                            dataSource: data[1].Chart,
                                            //title:"Staffs",
                                            legend: { visible: true, position: 'left' },
                                            tooltip: { enabled: true },
                                            series: {
                                                argumentField: 'DataFieild',
                                                valueField: 'ValueField'
                                            },
                                        });

                                    }
                                    if (data[0].Chart.length > 0) {
                                        $('#ApplicationChartDiv').show();
                                        $('#ApplicationChart').dxPieChart({
                                            dataSource: data[0].Chart,
                                            //title:"Staffs",
                                            legend: { visible: true, position: 'left' },
                                            tooltip: { enabled: true },
                                            series: {
                                                type: 'doughnut',
                                                argumentField: 'DataFieild',
                                                valueField: 'ValueField'
                                            },
                                        });
                                    }
                                }
                            });
                        });
                    }
                    else if (data == "Joining") {
                        $('#GenNav').append(
                            `<li><a id="navAbout">About</a></li>
                            <li><a id="Logout">Logout</a></li>`
                        );
                        $('#mainContent').empty();
                        $('#spinner').show();
                        $('#mainContent').load('/JoiningLetter/Index', function () {
                            $('#spinner').hide();
                            $('.tooltipped').tooltip({ delay: 50 });
                            $('#JoiningLetterForm').validate(joiningappvalidationobject);
                        });
                    }
                    else {
                        $('#GenNav').append(
                            `<li><a id="navAbout">About</a></li>
                            <li><a id="Logout">Logout</a></li>`
                        );
                        $('#mainContent').empty();
                        $('#spinner').show();
                        $('#mainContent').load('/Home/Index', function () { $('#spinner').hide(); });
                    }

                    username = data;
                }
            }

        });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '#SubmitJoiningApp', function () {
        $('body').find('div.material-tooltip').remove();
        if ($('#JoiningLetterForm').valid()) {
            var JoiningLetter = {
                Id: $('#ApplicantId').attr('data-val'),
                PartnerId: $('#PartnerId').attr('data-val'),
                AppSubject: $('#JoiningSubject').val(),
                AppBody: $('#txtJoiningBody').val()
            };
        }

        $.ajax({
            url: '/JoiningLetter/SubmitLetter',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(JoiningLetter),
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                if (data == "Success") {
                    $('.tooltipped').tooltip({ delay: 50 });
                    $('#JoiningLetterContent').empty();
                    $('#JoiningLetterContent').html("Thank you for joining");
                }
            },
            error: function (err) {
                alert(err.message);
            }
        });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('change', '#SelectStudent', function () {
        $("#userImage").attr("src", "/Photo/" + $(this).val() + " " + $('#SelectStudent option:selected').text().trim() + ".jpg");
    });

    $('body').on('change', '[name="SelectPartner"]', function () {
        $("#partnerImage").attr("src", "/Photo/" + $(this).val() + " " + $('[name="SelectPartner"] option:selected').text().trim() + ".jpg");
    });

    $('body').on('click', '[name="AllApps"]', function () {
        var AppInfo;
        if ($('body').find('#btnTerminated').length > 0) {
            AppInfo = {
                Id: $('#btnTerminated').val(),
                Info: $(this).attr('data-val')
            };
        }
        else {
            AppInfo = {
                Id: $('#FirstApp').attr('data-val'),
                Info: $(this).attr('data-val')
            };
        }

        HighlightSelectedApplication($(this));

        $.ajax({
            url: '/PartnersBoard/ProcessAnApplication',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(AppInfo),
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                if (data == "Success") {
                    $('#GenInfo').hide();
                    $('#AllAppDiv').empty();
                    $('#AllAppDiv').load('/PartnersBoard/ReadAllApplication', function () {
                        $('.tooltipped').tooltip({ delay: 50 });
                        $('#GenInfo').show();
                    });
                }
            },
            error: function (err) {
                alert(err.message);
            }
        });
    });

    $('body').on('click', '#CloseAppDiv', function () {
        $('body').find('div.material-tooltip').remove();
        $('#AllAppDiv').empty();
        $('tr').removeClass('orange lighten-3');
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '#CloseTransferDiv', function () {
        $('body').find('div.material-tooltip').remove();
        $('#TransferStudent').empty();
        //$('tr').removeClass('orange lighten-3');
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '#CloseTransferEmpDiv', function () {
        $('body').find('div.material-tooltip').remove();
        $('#TransferEmployees').empty();
        //$('tr').removeClass('orange lighten-3');
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '#ClosePromoteDiv', function () {
        $('body').find('div.material-tooltip').remove();
        $('#PromoteDiv').empty();
        //$('tr').removeClass('orange lighten-3');
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '[name="AllApps2"]', function () {
        var AppInfo;
        if ($('body').find('#btnTerminated').length > 0) {
            AppInfo = {
                Id: $('#btnTerminated').val(),
                Info: $(this).attr('data-val')
            };
        }
        else {
            AppInfo = {
                Id: $('#FirstApp').attr('data-val'),
                Info: $(this).attr('data-val')
            };
        }

        HighlightSelectedApplication($(this));

        $.ajax({
            url: '/AdminsBoard/ProcessAnApplication',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(AppInfo),
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                if (data == "Success") {
                    $('#GenInfo').hide();
                    $('#AllAppDiv').empty();
                    $('#AllAppDiv').load('/AdminsBoard/ReadAllApplication', function () {
                        $('.tooltipped').tooltip({ delay: 50 });
                        $('#GenInfo').show();
                    });
                }
            },
            error: function (err) {
                alert(err.message);
            }
        });
    });

    $('body').on('click', '[name="AllApps3"]', function () {
        var AppInfo = {
            Id: $('#btnTerminated').val(),
            Info: $(this).attr('data-val')
        };

        HighlightSelectedApplication($(this));

        $.ajax({
            url: '/ManagersBoard/ProcessAnApplication',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(AppInfo),
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                if (data == "Success") {
                    $('#GenInfo').hide();
                    $('#AllAppDiv').empty();
                    $('#AllAppDiv').load('/ManagersBoard/ReadAllApplication', function () {
                        $('.tooltipped').tooltip({ delay: 50 });
                        $('#GenInfo').show();
                    });
                }
            },
            error: function (err) {
                alert(err.message);
            }
        });
    });

    $('body').on('click', '#btnCC', function () {
        $('#ConfirmCCModal').closeModal();
        $('body').find('div.material-tooltip').remove();
        var StudentId = { id: $(this).val() };
        $.ajax({
            url: '/AdminsBoard/CourseComplete',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(StudentId),
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                if (data == "Updated") {
                    $('#mainContent').empty();
                    $('#spinner').show();
                    $('#mainContent').load('/AdminsBoard/Index', function () {
                        $('#spinner').hide();
                    });
                }
                $('.tooltipped').tooltip({ delay: 50 });
            },
            error: function (err) {
                alert(err.message);
            }
        });
    });

    $('body').on('click', '#btnPromote', function () {
        $('body').find('div.material-tooltip').remove();
        var StudentId = { Id: $(this).val() };
        $.ajax({
            url: '/AdminsBoard/Checkb4Promotion',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(StudentId),
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                if (data == "Promote") {
                    if ($('body').find('#EmployeePromotionForm').length == 0) {
                        $('#PromoteDiv').empty();
                        $('#Promospinner').show();
                        $('#PromoteDiv').load('/AdminsBoard/Promotion', function () {
                            $('#Promospinner').hide();
                            $('#SelectPartner').material_select();
                            $('#SelectDepartment').material_select();
                            $('#SelectPosition').material_select();
                            $('#EmployeePromotionForm').validate(promotionvalidation);
                            $('.tooltipped').tooltip({ delay: 50 });
                        });
                    }
                }
                else {
                    if ($('#TransferStudent').find('#StudentTransferForm').length == 0) {
                        $('#TransferStudent').load('/AdminsBoard/TransferStudent', function () {
                            $('#SelectManager').material_select();
                            $('#StudentTransferForm').validate(transfervalidation);
                            $('.tooltipped').tooltip({ delay: 50 });
                        });
                    }
                }
                $('.tooltipped').tooltip({ delay: 50 });
            },
            error: function (err) {
                alert(err.message);
            }
        });
    });

    $('body').on('click', '#btnConfirmPromotion', function () {
        $('body').find('div.material-tooltip').remove();
        if ($('#EmployeePromotionForm').valid()) {
            var HRSupervisory = {
                Id: $('#btnPromote').val(),
                PartnerId: $('#SelectPartner').val(),
                DepartmentId: $('#SelectDepartment').val(),
                StatusId: $('#SelectPosition').val()
            };
            $.ajax({
                url: '/AdminsBoard/Promote',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(HRSupervisory),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    if (data == "Updated") {
                        $('#mainContent').empty();
                        $('#spinner').show();
                        $('#mainContent').load('/AdminsBoard/Index', function () {
                            $('#spinner').hide();
                        });
                    }
                },
                error: function (err) {
                    alert(err.message);
                }
            });
        }
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '#btnConfirmTerminate', function () {
        $('body').find('div.material-tooltip').remove();
        $('#ConfirmTerminateModal').openModal({ dismissible: false });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '#btnConfirmCC', function () {
        $('body').find('div.material-tooltip').remove();
        $('#ConfirmCCModal').openModal({ dismissible: false });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '#btnConsirmRejection', function () {
        $('body').find('div.material-tooltip').remove();
        $('#ConfirmRejectionModal').openModal({ dismissible: false });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '#btnDoNotTerminate', function () {
        $('#ConfirmTerminateModal').closeModal();
    });

    $('body').on('click', '#btnDoNotReject', function () {
        $('#ConfirmRejectionModal').closeModal();
    });

    $('body').on('click', '#btnNotCC', function () {
        $('#ConfirmCCModal').closeModal();
    });

    //btnLeft and btnTerminated are same
    $('body').on('click', '#btnTerminated', function () {
        $('#ConfirmTerminateModal').closeModal();
        var LeftOrTerminated = {
            Id: $('#btnTerminated').val(),
            Status: 'Terminated'
        };
        $.ajax({
            url: '/AdminsBoard/GoodBye',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(LeftOrTerminated),
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                if (data == "Updated") {
                    $('#mainContent').empty();
                    $('#spinner').show();
                    $('#mainContent').load('/AdminsBoard/Index', function () {
                        $('#spinner').hide();
                    });

                }
                else if (data == "HasStudent") {
                    if ($('#TransferStudent').find('#StudentTransferForm').length == 0) {
                        $('#TransferStudent').load('/AdminsBoard/TransferStudent', function () {
                            $('#SelectManager').material_select();
                            $('#StudentTransferForm').validate(transfervalidation);
                            
                            $('.tooltipped').tooltip({ delay: 50 });
                        });
                    }
                }
            },
            error: function (err) {
                alert(err.message);
            }
        });
    });

    $('body').on('click', '#btnConfirmExit', function () {
        $('body').find('div.material-tooltip').remove();
        $('#ConfirmExitModal').openModal({ dismissible: false });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '#btnConfirmPartnerExit', function () {
        $('body').find('div.material-tooltip').remove();
        $('#ConfirmPartnerExitModal').openModal({ dismissible: false });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '#btnNotExit', function () {
        $('#ConfirmExitModal').closeModal();
    });

    $('body').on('click', '#btnPartnerNotExit', function () {
        $('#ConfirmPartnerExitModal').closeModal();
    });

    //btnLeft and btnTerminated are same
    $('body').on('click', '#btnLeft', function () {
        $('#ConfirmExitModal').closeModal();
        var LeftOrTerminated = {
            Id: $(this).val(),
            Status: 'Left'
        };
        $.ajax({
            url: '/AdminsBoard/GoodBye',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(LeftOrTerminated),
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                if (data == "Updated") {
                    $('#mainContent').empty();
                    $('#spinner').show();
                    $('#mainContent').load('/AdminsBoard/Index', function () {
                        $('#spinner').hide();
                    });
                }
                else if (data == "HasStudent") {
                    if ($('#TransferStudent').find('#StudentTransferForm').length == 0) {
                        $('#TransferStudent').load('/AdminsBoard/TransferStudent', function () {
                            $('#SelectManager').material_select();
                            $('#StudentTransferForm').validate(transfervalidation);
                            $('.tooltipped').tooltip({ delay: 50 });
                        });
                    }
                }
            },
            error: function (err) {
                alert(err.message);
            }
        });
    });

    $('body').on('click', '#btnPartnerLeft', function () {
        $('#ConfirmPartnerExitModal').closeModal();
        var LeftOrTerminated = {
            Id: $(this).val(),
            Status: 'Left'
        };
        $.ajax({
            url: '/AdminsBoard/GoodByePartner',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(LeftOrTerminated),
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                if (data == "Updated") {
                    $('#mainContent').empty();
                    $('#spinner').show();
                    $('#mainContent').load('/AdminsBoard/Index', function () {
                        $('#spinner').hide();
                    });
                }

                else if (data == "HasBoth") {
                    if ($('#TransferEmployees').find('#EmployeeTransferForm').length == 0) {
                        $('#TransferEmployees').load('/AdminsBoard/TransferEmployeeFrompartner', function () {
                            $('#SelectPartner1').material_select();
                            $('#EmployeeTransferForm').validate(empTransfervalidation);
                            $('.tooltipped').tooltip({ delay: 50 });
                        });
                    }

                    if ($('#TransferStudent').find('#AllStudentTransferForm').length == 0) {
                        $('#TransferStudent').load('/AdminsBoard/TransferStudentFromPartner', function () {
                            $('#SelectPartner2').material_select();
                            $('#SelectManager').material_select();
                            $('#AllStudentTransferForm').validate(allStuTransfervalidation);
                            $('.tooltipped').tooltip({ delay: 50 });
                        });
                    }
                }

                else if (data == "HasEmployee") {
                    if ($('#TransferEmployees').find('#EmployeeTransferForm').length == 0) {
                        $('#TransferEmployees').load('/AdminsBoard/TransferEmployeeFrompartner', function () {
                            $('#SelectPartner1').material_select();
                            $('#EmployeeTransferForm').validate(empTransfervalidation);
                            $('.tooltipped').tooltip({ delay: 50 });
                        });
                    }
                }

                else if (data == "HasStudent") {
                    if ($('#TransferStudent').find('#AllStudentTransferForm').length == 0) {
                        $('#TransferStudent').load('/AdminsBoard/TransferStudentFromPartner', function () {
                            $('#SelectPartner2').material_select();
                            $('#SelectManager').material_select();
                            $('#AllStudentTransferForm').validate(allStuTransfervalidation);
                            $('.tooltipped').tooltip({ delay: 50 });
                        });
                    }
                }
            },
            error: function (err) {
                alert(err.message);
            }
        });
    });

    $('body').on('click', '#btnTransferOne', function () {
        $('body').find('div.material-tooltip').remove();
        var StudentId = { Id: $(this).val() };
        $.ajax({
            url: '/AdminsBoard/GetRegistrationInfo',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(StudentId),
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                if ($('body').find('#SingleStudentTransferForm').length == 0) {
                    $('#PromoteDiv').empty();
                    $('#Promospinner').show();
                    $('#PromoteDiv').load('/AdminsBoard/TransferAStudent', function () {
                        $('#Promospinner').hide();
                        $('#SelectPartner').material_select();
                        $('#SelectManager').material_select();
                        $('#SingleStudentTransferForm').validate(singletransfervalidation);
                        $('.tooltipped').tooltip({ delay: 50 });
                    });
                }
                $('.tooltipped').tooltip({ delay: 50 });
            },
            error: function (err) {
                alert(err.message);
            }
        });
    });

    $('body').on('click', '#btnTransferAStudent', function () {
        $('body').find('div.material-tooltip').remove();
        if ($('#SingleStudentTransferForm').valid()) {
            var HRSupervisory = {
                Id: $(this).val(),
                PartnerId: $('#SelectPartner').val(),
                ManagerId: $('#SelectManager').val()
            };
            $.ajax({
                url: '/AdminsBoard/ConfirmAStudentTransfer',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(HRSupervisory),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    if (data == "Updated") {
                        $('#mainContent').empty();
                        $('#spinner').show();
                        $('#mainContent').load('/AdminsBoard/Index', function () {
                            $('#spinner').hide();
                        });
                    }
                    else {
                        alert(data);
                    }
                },
                error: function (err) {
                    alert(err.message);
                }
            });
        }
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '#btnPartnerJoiningDate', function () {
        $('body').find('div.material-tooltip').remove();
        var StudentId = { Id: $(this).val() };
        $.ajax({
            url: '/AdminsBoard/GetJoiningDate',
            type: 'POST',
            dataType: 'html',
            data: JSON.stringify(StudentId),
            contentType: 'application/json; charset=utf-8',
            success: function (result) {
                if ($('#PromoteDiv').find('#JoiningDateForm').length == 0) {
                    $('#PromoteDiv').empty();
                    $('#PromoteDiv').html(result).promise().done(function () {
                        $('#JoiningDate').pickadate({
                            selectMonths: true,
                            selectYears: 25,
                            min: new Date(1980, 12, 16),
                            max: new Date(2005, 12, 16)
                        });
                        $('#JoiningDateForm').validate(joiningdatevalidation);
                        $('.tooltipped').tooltip({ delay: 50 });
                    });
                }
            },
            error: function (xhr, status, p3, p4) {
                var err = "Error " + " " + status + " " + p3 + " " + p4;
                if (xhr.responseText && xhr.responseText[0] == "{")
                    err = JSON.parse(xhr.responseText).Message;
                console.log(err);
            }
        });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '#btnUpdateJoiningDate', function () {
        $('body').find('div.material-tooltip').remove();
        if ($('#JoiningDateForm').valid()) {
            var JoinedPartnerUpdateInfo = {
                PartnerId: $(this).val(),
                UserName: $('[title="InitUserName"]').val(),
                Password: $('[title="InitPassword"]').val(),
                JoiningDate: $('#JoiningDate').val()
            };

            $.ajax({
                url: '/AdminsBoard/UpdatePartnerInfo',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(JoinedPartnerUpdateInfo),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    if (data == "Updated") {
                        $('#PromoteDiv').empty();
                        Materialize.toast('Updated Successfulyy', 6000);
                    }
                    else if (data == "Exists") {
                        $('#errorMsg').html('Try a different username');
                    }
                    else {
                        $('#errorMsg').html(msg);
                    }
                },
                error: function (err) {
                    alert(err.message);
                }
            });
        }
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '#btnTransfer', function () {
        $('body').find('div.material-tooltip').remove();
        if ($('#StudentTransferForm').valid()) {
            var TransferInfo = {
                OldSup: $('#btnLeft').val(),
                NewSup: $('#SelectManager').val()
            }
            $.ajax({
                url: '/AdminsBoard/Transfer',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(TransferInfo),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    if (data == "Updated") {
                        $('#mainContent').empty();
                        $('#spinner').show();
                        $('#mainContent').load('/AdminsBoard/Index', function () {
                            $('#spinner').hide();
                        });
                    }
                },
                error: function (err) {
                    alert(err.message);
                }
            });
        }
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '#btnTransferAllEmployees', function () {
        $('body').find('div.material-tooltip').remove();
        if ($('#EmployeeTransferForm').valid()) {
            var TransferInfo = {
                OldSup: $(this).val(),
                NewSup: $('#SelectPartner1').val()
            }
            $.ajax({
                url: '/AdminsBoard/TransferAllEmployees',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(TransferInfo),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    if (data == "Updated") {
                        $('#PartnersEmployees').empty();
                        Materialize.toast('Transferred Successfully', 6000);
                    }
                    else if (data == "HasStudent") {
                        Materialize.toast('Transfer student(s) first', 6000);
                    }
                },
                error: function (err) {
                    alert(err.message);
                }
            });
        }
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '#btnTransferAllStudent', function () {
        $('body').find('div.material-tooltip').remove();
        if ($('#AllStudentTransferForm').valid()) {
            var AllStudentTransferInfo = {
                OldPartner: $(this).val(),
                NewPartner: $('#SelectPartner2').val(),
                NewManager: $('#SelectManager').val()
            }
            $.ajax({
                url: '/AdminsBoard/TransferAllStudents',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(AllStudentTransferInfo),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    if (data == "Updated") {
                        $('#SecondColumn').empty();
                        Materialize.toast('Transferred Successfully', 6000);
                    }
                },
                error: function (err) {
                    alert(err.message);
                }
            });
        }
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('change', '#SelectManager', function () {
        $("#managerImage").attr("src", "/Photo/" + $(this).val() + " " + $('#SelectManager option:selected').text().trim() + ".jpg");
    });

    $('body').on('change', '#SelectPartner', function () {
        $("#partnerImage").attr("src", "/Photo/" + $(this).val() + " " + $('#SelectPartner option:selected').text().trim() + ".jpg");
        var PartnerId = { Id: $(this).val() };

        $.ajax({
            url: '/AdminsBoard/ReturnManagers',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(PartnerId),
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                $('#SelectManager').empty().html();
                $('#SelectManager').append($("<option disabled selected></option>")
                            .attr("value", '')
                            .text('Choose')
                         );
                for (var i = 0; i < msg.length; i++) {
                    $('#SelectManager').append($("<option></option>")
                            .attr("value", msg[i].Id)
                            .text(msg[i].Name)
                         );
                }
                $('#SelectManager').material_select();
                $("#managerImage").removeAttr('src');
            }
        });
    });

    $('body').on('change', '#SelectPartner1', function () {
        $("#partnerImage1").attr("src", "/Photo/" + $(this).val() + " " + $('#SelectPartner1 option:selected').text().trim() + ".jpg");
        var PartnerId = { Id: $(this).val() };

        //$.ajax({
        //    url: '/AdminsBoard/ReturnManagers',
        //    type: 'POST',
        //    dataType: 'json',
        //    data: JSON.stringify(PartnerId),
        //    contentType: 'application/json; charset=utf-8',
        //    success: function (msg) {
        //        $('#SelectManager').empty().html();
        //        $('#SelectManager').append($("<option disabled selected></option>")
        //                    .attr("value", '')
        //                    .text('Choose')
        //                 );
        //        for (var i = 0; i < msg.length; i++) {
        //            $('#SelectManager').append($("<option></option>")
        //                    .attr("value", msg[i].Id)
        //                    .text(msg[i].Name)
        //                 );
        //        }
        //        $('#SelectManager').material_select();
        //        $("#managerImage").removeAttr('src');
        //    }
        //});
    });

    $('body').on('change', '#SelectPartner2', function () {
        $("#partnerImage2").attr("src", "/Photo/" + $(this).val() + " " + $('#SelectPartner2 option:selected').text().trim() + ".jpg");
        var PartnerId = { Id: $(this).val() };

        $.ajax({
            url: '/AdminsBoard/ReturnManagers',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(PartnerId),
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                $('#SelectManager').empty().html();
                $('#SelectManager').append($("<option disabled selected></option>")
                            .attr("value", '')
                            .text('Choose')
                         );
                for (var i = 0; i < msg.length; i++) {
                    $('#SelectManager').append($("<option></option>")
                            .attr("value", msg[i].Id)
                            .text(msg[i].Name)
                         );
                }
                $('#SelectManager').material_select();
                $("#managerImage").removeAttr('src');
            }
        });
    });

    $('body').on('change', '#User4Update', function () {
        var StudentId = { id: $(this).val() };
        $("#uImage").attr("src", "/Photo/" + StudentId.id + " " + $('#User4Update option:selected').text().trim() + ".jpg");

        $.ajax({
            url: '/ModifyUser/GetUserInfo',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(StudentId),
            contentType: 'application/json; charset=utf-8',
            success: function (result) {
                $('#UserInfo').empty();
                $('#UserInfo').load('/ModifyUser/ReturnUser');
                //$("#Photo").attr("src", "/TempPhoto/" + result);
            },
            error: function (xhr, status, p3, p4) {
                var err = "Error " + " " + status + " " + p3 + " " + p4;
                if (xhr.responseText && xhr.responseText[0] == "{")
                    err = JSON.parse(xhr.responseText).Message;
                console.log(err);
            }
        });
    });

    $('body').on('click', '#UserUpdate', function () {

        var user = {
            UserName: $('#txtUserName').val(),
            Role: $('#Role').val(),
            Status: $('#Status').val(),
        };

        $('#mainContent').empty();
        $('#spinner').show();

        $.ajax({
            url: 'ModifyUser/UpdateUser',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(user),
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                if (data == 'Updated') {
                    $('#mainContent').load('/ModifyUser/Index', function () {
                        $('#spinner').hide();
                    });
                }
            }
        });
    });

    $('body').on('click', '#btnAddUser', function () {

        var user = {
            Id: $('#SelectStudent').val(),
            UserName: $('[name="UserName"]').val(),
            Role: $('[name="Role"]').val(),
            Password: $('[name="Password"]').val(),
        };

        $('#mainContent').empty();
        $('#spinner').show();

        $.ajax({
            url: '/AddUser/UserAdd',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(user),
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                if (data == 'Invalid character') {
                    $('#mainContent').load('/AddUser/Index', function () {
                        $('#spinner').hide();
                        $('#Message').append('<h3>Invalid Character, try with different Name and/or Password</h3>');
                    });

                }
                else if (data == 'in use') {
                    $('#mainContent').load('/AddUser/Index', function () {
                        $('#spinner').hide();
                        $('#Message').append('<h3>' + user.UserName + ' is in use</h3>');
                    });

                }
                else if (data == 'Added') {
                    $('#mainContent').load('/AddUser/Index', function () {
                        $('#spinner').hide();
                        $('#Message').append('<h3>' + user.UserName + ' Added</h3>');
                    });
                }
            },
            error: function (err) {
                alert(err.message);
            }
        });
    });

    $('body').on('click', '#Letters', function () {
        $('body').find('div.material-tooltip').remove();
        $('#AdminsBoardContent').empty();
        HighlightSelectedSideNav($(this));
        $('#Adminspinner').show();
        $('#AdminsBoardContent').load('/AdminsBoard/GetJoiningLetters', function () {
            $('.tooltipped').tooltip({ delay: 50 });
            $('#Adminspinner').hide();
        });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '#SubmitApplication', function () {
        $('body').find('div.material-tooltip').remove();
        HighlightSelectedSideNav(this);
        $('#StudentsBoard').empty();
        $('#StudentSpinner').show();
        $('#StudentsBoard').load('/StudentsBoard/Apply', function () {
            $('#StudentSpinner').hide();
            $('#AppSubject').material_select();
            $('#StudentsApplication').validate(applicationvalidationobject);
            $('.tooltipped').tooltip({ delay: 50 });
        });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '#SubmitApplication2', function () {
        $('body').find('div.material-tooltip').remove();
        $('#ManagersBoardContent').empty();
        HighlightSelectedSideNav($(this));
        $('#ManagersBoardContent').load('/ManagersBoard/Apply', function () {
            $('#AppSubject').material_select();
            $('#ManagersApplication').validate(applicationvalidationobject);
            $('.tooltipped').tooltip({ delay: 50 });
        });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '#refreshStudentsBoard', function () {
        $('#mainContent').empty();
        $('#spinner').show();
        $('#mainContent').load('/StudentsBoard/Index', function () {
            $('#spinner').hide();
            $.ajax({
                url: '/StudentsBoard/ReturnCharts',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    console.log(data);
                    if (data[1].Chart.length > 0) {
                        $('#DecisionChartDiv').show();
                        $('#DecisionChart').dxPieChart({
                            dataSource: data[1].Chart,
                            //title:"Staffs",
                            legend: { visible: true, position: 'left' },
                            tooltip: { enabled: true },
                            series: {
                                argumentField: 'DataFieild',
                                valueField: 'ValueField'
                            },
                        });

                    }
                    if (data[0].Chart.length > 0) {
                        $('#ApplicationChartDiv').show();
                        $('#ApplicationChart').dxPieChart({
                            dataSource: data[0].Chart,
                            //title:"Staffs",
                            legend: { visible: true, position: 'left' },
                            tooltip: { enabled: true },
                            series: {
                                type: 'doughnut',
                                argumentField: 'DataFieild',
                                valueField: 'ValueField'
                            },
                        });
                    }
                }
            });
        });
    });

    $('body').on('click', '#refreshPartnersBoard', function () {
        $('#mainContent').empty();
        $('#spinner').show();
        $('#mainContent').load('/PartnersBoard/Index', function () {
            $('#spinner').hide();
            $.ajax({
                url: '/PartnersBoard/ReturnCharts',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    if (data[2].Chart.length > 0) {
                        $('#StaffsChartDiv').show();
                        $('#StaffsChart').dxChart({
                            dataSource: data[2].Chart,
                            //title:"Staffs",
                            legend: { visible: false },
                            tooltip: { enabled: true },
                            argumentAxis: {
                                label: {
                                    overlappingBehavior: 'rotate'
                                }
                            },

                            commonSeriesSettings: {
                                argumentField: 'DataFieild'
                            },

                            series: [
                                { valueField: 'ValueField1', type: 'bar', axis: 'main', color: '#ef6c00' },
                                { valueField: 'ValueField2', type: 'line', axis: 'secondary', color: '#03a9f4 ' }
                            ],
                            valueAxis: [
                                { name: 'main', title: 'Your Staff', label: { font: { color: '#ef6c00' } } },
                                { name: 'secondary', position: 'right', title: "Other's Staff", label: { font: { color: '#03a9f4 ' } } }
                            ]
                        });
                    }
                    if (data[1].Chart.length > 0) {
                        $('#DecisionChartDiv').show();
                        $('#DecisionChart').dxChart({
                            dataSource: data[1].Chart,
                            //title:"Staffs",
                            legend: { visible: false },
                            tooltip: { enabled: true },
                            argumentAxis: {
                                label: {
                                    overlappingBehavior: 'rotate'
                                }
                            },

                            commonSeriesSettings: {
                                argumentField: 'DataFieild'
                            },

                            series: [
                                { valueField: 'ValueField1', type: 'bar', axis: 'main', color: '#ef6c00' },
                                { valueField: 'ValueField2', type: 'line', axis: 'secondary', color: '#03a9f4 ' }
                            ],
                            valueAxis: [
                                { name: 'main', title: "Existing Staff's", label: { font: { color: '#ef6c00' } } },
                                { name: 'secondary', position: 'right', title: 'Total', label: { font: { color: '#03a9f4 ' } } }
                            ]
                        });

                    }
                    if (data[0].Chart.length > 0) {
                        $('#ApplicationChartDiv').show();
                        $('#ApplicationChart').dxChart({
                            dataSource: data[0].Chart,
                            //title:"Staffs",
                            legend: { visible: false },
                            tooltip: { enabled: true },
                            argumentAxis: {
                                label: {
                                    overlappingBehavior: 'rotate'
                                }
                            },

                            commonSeriesSettings: {
                                argumentField: 'DataFieild'
                            },

                            series: [
                                { valueField: 'ValueField1', type: 'bar', axis: 'main', color: '#ef6c00' },
                                { valueField: 'ValueField2', type: 'line', axis: 'secondary', color: '#03a9f4 ' }
                            ],
                            valueAxis: [
                                { name: 'main', title: "Existing Staff's", label: { font: { color: '#ef6c00' } } },
                                { name: 'secondary', position: 'right', title: 'Total', label: { font: { color: '#03a9f4 ' } } }
                            ]
                        });
                    }
                }
            });
        });
    });

    $('body').on('click', '#refreshManagersBoard', function () {
        $('#mainContent').empty();
        $('#spinner').show();
        $('#mainContent').load('/ManagersBoard/Index', function () {
            $('#spinner').hide();
            $.ajax({
                url: '/ManagersBoard/ReturnCharts',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (data) {

                    if (data[0].Chart.length > 0) {
                        $('#StaffsChartDiv').show();
                        $('#StaffsChart').dxPieChart({
                            dataSource: data[0].Chart,
                            legend: {
                                //verticalAlignment: "bottom",
                                horizontalAlignment: "center",
                                itemTextPosition: "bottom"
                            },
                            tooltip: { enabled: true },
                            series: {
                                argumentField: 'DataFieild',
                                valueField: 'ValueField1'
                            },
                        });
                    }
                    if (data[2].Chart.length > 0) {
                        $('#DecisionChartDiv').show();
                        $('#DecisionChart').dxChart({
                            dataSource: data[2].Chart,
                            //title:"Staffs",
                            legend: { visible: false },
                            tooltip: { enabled: true },
                            argumentAxis: {
                                label: {
                                    overlappingBehavior: 'rotate'
                                }
                            },

                            commonSeriesSettings: {
                                argumentField: 'DataFieild'
                            },

                            series: [
                                { valueField: 'ValueField1', type: 'bar', axis: 'main', color: '#ef6c00' },
                                { valueField: 'ValueField2', type: 'line', axis: 'secondary', color: '#03a9f4 ' }
                            ],
                            valueAxis: [
                                { name: 'main', title: "Student's Application", label: { font: { color: '#ef6c00' } } },
                                { name: 'secondary', position: 'right', title: 'Your Application', label: { font: { color: '#03a9f4 ' } } }
                            ]
                        });

                    }
                    if (data[1].Chart.length > 0) {
                        $('#ApplicationChartDiv').show();
                        $('#ApplicationChart').dxChart({
                            dataSource: data[1].Chart,
                            //title:"Staffs",
                            legend: { visible: false },
                            tooltip: { enabled: true },
                            argumentAxis: {
                                label: {
                                    overlappingBehavior: 'rotate'
                                }
                            },

                            commonSeriesSettings: {
                                argumentField: 'DataFieild'
                            },

                            series: [
                                { valueField: 'ValueField1', type: 'bar', axis: 'main', color: '#ef6c00' },
                                { valueField: 'ValueField2', type: 'line', axis: 'secondary', color: '#03a9f4 ' }
                            ],
                            valueAxis: [
                                { name: 'main', title: "Student's Application", label: { font: { color: '#ef6c00' } } },
                                { name: 'secondary', position: 'right', title: 'Your Application', label: { font: { color: '#03a9f4 ' } } }
                            ]
                        });
                    }
                }
            });
        });
    });

    $('body').on('click', '#refreshAdminsBoard', function () {
        $('#mainContent').empty();
        $('#spinner').show();
        $('#mainContent').load('/AdminsBoard/Index', function () {
            $('#spinner').hide();

            $.ajax({
                url: '/AdminsBoard/ReturnCounts',
                type: "GET",
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (msg) {
                    $('#ChartContainer').dxChart({
                        dataSource: msg.Chart,
                        legend: { visible: false },
                        series: {
                            type: 'bar',
                            color: '#e65100',
                            argumentField: 'DataFieild',
                            valueField: 'ValueField'
                        }
                    });
                }
            });

        });
    });

    $('body').on('click', '#SubmitApp', function () {
        $('body').find('div.material-tooltip').remove();
        if ($('#StudentsApplication').valid()) {
            var JSONApplication = {
                Id: $(this).val(),
                AppTypeId: $('#AppSubject').val(),
                AppBody: $('#txtApplicationBody').val(),
            };

            $.ajax({
                url: '/StudentsBoard/OnApplyAction',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(JSONApplication),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    if (data == "Inserted") {
                        $('#mainContent').empty();
                        $('#mainContent').load('/StudentsBoard/Index', function () {

                        });
                    }
                    else {
                        alert(data);
                    }
                },
                error: function (err) {
                    alert(err.message);
                }
            });
        }
    });

    $('body').on('click', '#SubmitApp2', function () {
        $('body').find('div.material-tooltip').remove();
        if ($('#ManagersApplication').valid()) {
            var JSONApplication = {
                Id: $(this).val(),
                AppTypeId: $('#AppSubject').val(),
                AppBody: $('#txtApplicationBody').val(),
            };

            $.ajax({
                url: '/ManagersBoard/OnApplyAction',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(JSONApplication),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    if (data == "Inserted") {
                        $('#mainContent').empty();
                        $('#mainContent').load('/ManagersBoard/Index', function () {

                        });
                    }
                    else {
                        alert(data);
                    }
                },
                error: function (err) {
                    alert(err.message);
                }
            });
        }
    });

    $('body').on('click', '#Profile', function () {
        $('#StudentsBoard').empty();
        HighlightSelectedSideNav(this);
        $('#StudentSpinner').show();
        $('#StudentsBoard').load('/StudentsBoard/ViewCV', function () {
            $('#StudentSpinner').hide();
        });
    });

    $('body').on('click', '#AdminPanel', function () {
        $('#mainContent').empty();
        $('#spinner').show();
        $('#mainContent').load('/AdminsBoard/Index', function () {
            $('#spinner').hide();

            $.ajax({
                url: '/AdminsBoard/ReturnCounts',
                type: "GET",
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (msg) {
                    console.log(msg.Chart);
                    $('#ChartContainer').dxChart({
                        dataSource: msg.Chart,
                        legend: { visible: false },
                        series: {
                            type: 'bar',
                            color: '#e65100',
                            argumentField: 'DataFieild',
                            valueField: 'ValueField'
                        }
                    });
                }
            });

        });
    });

    $('body').on('click', '#ViewStudentCV', function () {
        empPage = ccPage = artPage = afrPage = partPage = appPage = 1;
        $('body').find('div.material-tooltip').remove();
        $('#AdminsBoardContent').empty();
        HighlightSelectedSideNav($(this));
        $('#Adminspinner').show();
        $('#AdminsBoardContent').load('/AdminsBoard/ReturnStudentList', function () {
            $('.tooltipped').tooltip({ delay: 50 });
            $('#Adminspinner').hide();
        });
    });

    $('body').on('click', '#ApplicantCV', function () {
        studAppPage = jobAppPage = 1;
        $('#AdminsBoardContent').empty();
        HighlightSelectedSideNav($(this));
        $('#Adminspinner').show();
        $('#AdminsBoardContent').load('/AdminsBoard/ReturnNewApplicantList', function () {
            $('#Adminspinner').hide();
            $('.tooltipped').tooltip({ delay: 50 });
        });
    });

    $('body').on('click', '#ApplicantCV2', function () {
        studAppPage = jobAppPage = 1;

        $('#PartnersBoardContent').empty();
        HighlightSelectedSideNav($(this));
        $('#Partnerspinner').show();
        $('#PartnersBoardContent').load('/PartnersBoard/ReturnNewApplicantList', function () {
            $('#Partnerspinner').hide();
            $('.tooltipped').tooltip({ delay: 50 });
        });
    });

    $('body').on('click', '#CheckApplication', function () {
        var ApplicationReading = {
            Sl: $(this).attr('data-val'),
            PageNo: $('#YourStudentsAppsBack').attr('data-val')
        };
        $('body').find('div.material-tooltip').remove();
        $.ajax({
            url: '/ManagersBoard/CheckApplication',
            type: "POST",
            data: JSON.stringify(ApplicationReading),
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                if (msg == "Updated") {
                    $('#mainContent').empty();
                    $('#spinner').show();
                    $('#mainContent').load('/ManagersBoard/Index', function () {
                        $('#spinner').hide();
                        $('#YourStudentsApps').parent().addClass('orange lighten-3');
                        $('#ManagersBoardContent').empty();
                        $('#Managerspinner').show();

                        $('#ManagersBoardContent').load('/ManagersBoard/ReadApplication', function () {
                            $('#Managerspinner').hide();
                            $('.tooltipped').tooltip({ delay: 50 });
                            if ($('#ManagersBoardContent').find('#ManagerNoteForm').length > 0) {
                                $('#ManagerNoteForm').validate(noteonapplicationvalidation);
                                $('.tooltipped').tooltip({ delay: 50 });
                            }
                        });
                    });
                }
                else {
                    alert(msg);
                }
            }
        });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '#SubmitManagerNote', function () {
        $('body').find('div.material-tooltip').remove();
        if ($('#ManagerNoteForm').valid()) {
            var AppNote = {
                Sl: $(this).val(),
                Note: $('#ManagerNote').val()
            };

            $.ajax({
                url: '/ManagersBoard/MakeNote',
                type: "POST",
                data: JSON.stringify(AppNote),
                contentType: 'application/json; charset=utf-8',
                success: function (msg) {
                    if (msg == "Updated") {
                        $('#ManagersBoardContent').empty();
                        $('#Managerspinner').show();
                        $('#ManagersBoardContent').load('/ManagersBoard/ReadApplication', function () {
                            $('#Managerspinner').hide();
                        });
                    }
                    else {
                        alert(msg);
                    }
                }
            });
        }
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '#SubmitManagerNote2', function () {
        $('body').find('div.material-tooltip').remove();
        if ($('#PartnerNoteForm').valid()) {
            var AppNote = {
                Sl: $(this).val(),
                Note: $('#ManagerNote').val(),
                Accepted: $('input[name="AppAcceptance"]:checked').val()
            };

            $.ajax({
                url: '/PartnersBoard/MakeNote',
                type: "POST",
                data: JSON.stringify(AppNote),
                contentType: 'application/json; charset=utf-8',
                success: function (msg) {
                    if (msg == "Updated") {
                        $('#PartnersBoardContent').empty();
                        $('#Partnerspinner').show();
                        $('#PartnersBoardContent').load('/PartnersBoard/ReadApplication', function () {
                            $('#Partnerspinner').hide();
                        });
                    }
                    else {
                        alert(msg);
                    }
                }
            });
        }
        $('.tooltipped').tooltip({ delay: 50 });
    });

    var mAppPage = 1;
    $('body').on('click', '#YourStudentsApps', function () {
        var a = $(this).parent();
        if (a[0].nodeName.toLowerCase() == 'li') {
            mAppPage = 1;
            HighlightSelectedSideNav($(this));
        }
        else {
            if ($(this).val() == 'Back') {
                var page = $(this).attr('data-val');
                if (page == 0) {
                    mAppPage = 1;
                }
                else {
                    mAppPage = page;
                }
            }
            else {
                mAppPage++;
            }
        }

        $('body').find('div.material-tooltip').remove();
        var ApplicationPaging = {
            PageNo: mAppPage,
            PageSize: 10
        };
        $.ajax({
            url: '/ManagersBoard/SeeApplications',
            type: "POST",
            dataType: "html",
            data: JSON.stringify(ApplicationPaging),
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                $('#ManagersBoardContent').empty();
                $('#Managerspinner').show();
                $('#ManagersBoardContent').html(msg).promise().done(function () {
                    $('#Managerspinner').hide();
                    $('.tooltipped').tooltip({ delay: 50 });
                });

            }
        });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    var empPage, ccPage, artPage, afrPage, appPage, partPage, studAppPage, jobAppPage, pageSize;
    pageSize = 5
    $('body').on('click', '[name="LoadAll"]', function () {
        $('body').find('div.material-tooltip').remove();
        var who = $(this).attr('data-val');
        var page = 0;
        switch(who){
            case 'employee':
                empPage++;
                page = empPage;
                break;
            case 'cc':
                ccPage++;
                page = ccPage;
                break;
            case 'articled':
                artPage++;
                page = artPage;
                break;
            case 'applied':
                afrPage++;
                page = afrPage;
                break;
            case 'partner':
                partPage++;
                page = partPage;
                break;
            case 'job':
                jobAppPage++;
                page = jobAppPage;
                break;
            case 'student':
                studAppPage++;
                page = studAppPage;
                break;
            default:
                appPage++;
                page = appPage;
        }
       
        var EmployeePaging = {
            Who: who,
            PageNo: page,
            PageSize: pageSize,
            Under: $(this).attr('data-info')
        };

        $.ajax({
            url: '/PartnersBoard/SendAllStaff',
            type: "POST",
            dataType:"html",
            data: JSON.stringify(EmployeePaging),
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                $('#' + who + 'Div').empty();
                $('#' + who + 'Div').append(msg);
                $('#' + who + 'Btns').remove();
                $('.tooltipped').tooltip({ delay: 50 });
            }
        });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '[name="LoadNext5"]', function () {
        $('body').find('div.material-tooltip').remove();
        var who = $(this).attr('data-val');
        var page = 0;
        switch (who) {
            case 'employee':
                empPage++;
                page = empPage;
                break;
            case 'cc':
                ccPage++;
                page = ccPage;
                break;
            case 'articled':
                artPage++;
                page = artPage;
                break;
            case 'applied':
                afrPage++;
                page = afrPage;
                break;
            case 'partner':
                partPage++;
                page = partPage;
                break;
            case 'job':
                jobAppPage++;
                page = jobAppPage;
                break;
            case 'student':
                studAppPage++;
                page = studAppPage;
                break;
            default:
                appPage++;
                page = appPage;
        }

        var EmployeePaging = {
            Who: who,
            PageNo: page,
            PageSize: pageSize,
            Under: $(this).attr('data-info')
        };

        $.ajax({
            url: '/PartnersBoard/SendPartOfStaff',
            type: "POST",
            dataType: "html",
            data: JSON.stringify(EmployeePaging),
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                $('#' + who + 'Div').empty();
                $('#' + who + 'Btns').remove();
                $('#' + who + 'Div').append(msg);
                $('.tooltipped').tooltip({ delay: 50 });
            }
        });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '[name="LoadBack"]', function () {
        $('body').find('div.material-tooltip').remove();
        var who = $(this).attr('data-val');
        var page = 0;
        switch (who) {
            case 'employee':
                empPage--;
                page = empPage;
                break;
            case 'cc':
                ccPage--;
                page = ccPage;
                break;
            case 'articled':
                artPage--;
                page = artPage;
                break;
            case 'applied':
                afrPage--;
                page = afrPage;
                break;
            case 'partner':
                partPage--;
                page = partPage;
                break;
            case 'job':
                jobAppPage--;
                page = jobAppPage;
                break;
            case 'student':
                studAppPage--;
                page = studAppPage;
                break;
            default:
                appPage--;
                page = appPage;
        }

        var EmployeePaging = {
            Who: who,
            PageNo: page,
            PageSize: pageSize,
            Under: $(this).attr('data-info')
        };

        $.ajax({
            url: '/PartnersBoard/SendPartOfStaff',
            type: "POST",
            dataType: "html",
            data: JSON.stringify(EmployeePaging),
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                $('#' + who + 'Div').empty();
                $('#' + who + 'Btns').remove();
                $('#' + who + 'Div').append(msg);
                $('.tooltipped').tooltip({ delay: 50 });
            }
        });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '[name="FirstPage"]', function () {
        $('body').find('div.material-tooltip').remove();
        var who = $(this).attr('data-val');
        var page = 0;
        switch (who) {
            case 'employee':
                empPage = 1;
                page = empPage;
                break;
            case 'cc':
                ccPage = 1;
                page = ccPage;
                break;
            case 'articled':
                artPage = 1;
                page = artPage;
                break;
            case 'applied':
                afrPage = 1;
                page = afrPage;
                break;
            case 'partner':
                partPage = 1;
                page = partPage;
                break;
            case 'job':
                jobAppPage = 1;
                page = jobAppPage;
                break;
            case 'student':
                studAppPage = 1;
                page = studAppPage;
                break;
            default:
                appPage = 1;
                page = appPage;
        }

        var EmployeePaging = {
            Who: who,
            PageNo: page,
            PageSize: pageSize,
            Under: $(this).attr('data-info')
        };

        $.ajax({
            url: '/PartnersBoard/SendPartOfStaff',
            type: "POST",
            dataType: "html",
            data: JSON.stringify(EmployeePaging),
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                $('#' + who + 'Div').empty();
                $('#' + who + 'Btns').remove();
                $('#' + who + 'Div').append(msg);
                $('.tooltipped').tooltip({ delay: 50 });
            }
        });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '[name="AdmLoadAll"]', function () {
        $('body').find('div.material-tooltip').remove();
        var who = $(this).attr('data-val');
        var page = 0;
        switch (who) {
            case 'employee':
                empPage++;
                page = empPage;
                break;
            case 'cc':
                ccPage++;
                page = ccPage;
                break;
            case 'articled':
                artPage++;
                page = artPage;
                break;
            case 'applied':
                afrPage++;
                page = afrPage;
                break;
            case 'partner':
                partPage++;
                page = partPage;
                break;
            case 'job':
                jobAppPage++;
                page = jobAppPage;
                break;
            case 'student':
                studAppPage++;
                page = studAppPage;
                break;
            default:
                appPage++;
                page = appPage;
        }

        var EmployeePaging = {
            Who: who,
            PageNo: page,
            PageSize: pageSize,
            Under: $(this).attr('data-info')
        };

        $.ajax({
            url: '/AdminsBoard/SendAllStaff',
            type: "POST",
            dataType: "html",
            data: JSON.stringify(EmployeePaging),
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                $('#' + who + 'Div').empty();
                $('#' + who + 'Div').append(msg);
                $('#' + who + 'Btns').remove();
                $('.tooltipped').tooltip({ delay: 50 });
            }
        });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '[name="AdmLoadNext5"]', function () {
        $('body').find('div.material-tooltip').remove();
        var who = $(this).attr('data-val');
        var page = 0;
        switch (who) {
            case 'employee':
                empPage++;
                page = empPage;
                break;
            case 'cc':
                ccPage++;
                page = ccPage;
                break;
            case 'articled':
                artPage++;
                page = artPage;
                break;
            case 'applied':
                afrPage++;
                page = afrPage;
                break;
            case 'partner':
                partPage++;
                page = partPage;
                break;
            case 'job':
                jobAppPage++;
                page = jobAppPage;
                break;
            case 'student':
                studAppPage++;
                page = studAppPage;
                break;
            default:
                appPage++;
                page = appPage;
        }

        var EmployeePaging = {
            Who: who,
            PageNo: page,
            PageSize: pageSize,
            Under: $(this).attr('data-info')
        };

        $.ajax({
            url: '/AdminsBoard/SendPartOfStaff',
            type: "POST",
            dataType: "html",
            data: JSON.stringify(EmployeePaging),
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                $('#' + who + 'Div').empty();
                $('#' + who + 'Btns').remove();
                $('#' + who + 'Div').append(msg);
                $('.tooltipped').tooltip({ delay: 50 });
            }
        });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '[name="AdmLoadBack"]', function () {
        $('body').find('div.material-tooltip').remove();
        var who = $(this).attr('data-val');
        var page = 0;
        switch (who) {
            case 'employee':
                empPage--;
                page = empPage;
                break;
            case 'cc':
                ccPage--;
                page = ccPage;
                break;
            case 'articled':
                artPage--;
                page = artPage;
                break;
            case 'applied':
                afrPage--;
                page = afrPage;
                break;
            case 'partner':
                partPage--;
                page = partPage;
                break;
            case 'job':
                jobAppPage--;
                page = jobAppPage;
                break;
            case 'student':
                studAppPage--;
                page = studAppPage;
                break;
            default:
                appPage--;
                page = appPage;
        }

        var EmployeePaging = {
            Who: who,
            PageNo: page,
            PageSize: pageSize,
            Under: $(this).attr('data-info')
        };

        $.ajax({
            url: '/AdminsBoard/SendPartOfStaff',
            type: "POST",
            dataType: "html",
            data: JSON.stringify(EmployeePaging),
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                $('#' + who + 'Div').empty();
                $('#' + who + 'Btns').remove();
                $('#' + who + 'Div').append(msg);
                $('.tooltipped').tooltip({ delay: 50 });
            }
        });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '[name="AdmFirstPage"]', function () {
        $('body').find('div.material-tooltip').remove();
        var who = $(this).attr('data-val');
        var page = 0;
        switch (who) {
            case 'employee':
                empPage = 1;
                page = empPage;
                break;
            case 'cc':
                ccPage = 1;
                page = ccPage;
                break;
            case 'articled':
                artPage = 1;
                page = artPage;
                break;
            case 'applied':
                afrPage = 1;
                page = afrPage;
                break;
            case 'partner':
                partPage = 1;
                page = partPage;
                break;
            case 'job':
                jobAppPage = 1;
                page = jobAppPage;
                break;
            case 'student':
                studAppPage = 1;
                page = studAppPage;
                break;
            default:
                appPage = 1;
                page = appPage;
        }

        var EmployeePaging = {
            Who: who,
            PageNo: page,
            PageSize: pageSize,
            Under: $(this).attr('data-info')
        };

        $.ajax({
            url: '/AdminsBoard/SendPartOfStaff',
            type: "POST",
            dataType: "html",
            data: JSON.stringify(EmployeePaging),
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                $('#' + who + 'Div').empty();
                $('#' + who + 'Btns').remove();
                $('#' + who + 'Div').append(msg);
                $('.tooltipped').tooltip({ delay: 50 });
            }
        });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '[name="ManLoadAll"]', function () {
        $('body').find('div.material-tooltip').remove();
        var who = $(this).attr('data-val');
        var page = 0;
        switch(who){
            case 'articled':
                artPage++;
                page = artPage;
                break;
            case 'applied':
                afrPage++;
                page = afrPage;
                break;
            default:
                appPage++;
                page = appPage;
        }
       
        var EmployeePaging = {
            Who: who,
            PageNo: page,
            PageSize: pageSize,
            Under: $(this).attr('data-info')
        };

        $.ajax({
            url: '/ManagersBoard/SendAllStaff',
            type: "POST",
            dataType:"html",
            data: JSON.stringify(EmployeePaging),
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                $('#' + who + 'Div').empty();
                $('#' + who + 'Div').append(msg);
                $('#' + who + 'Btns').remove();
                $('.tooltipped').tooltip({ delay: 50 });
            }
        });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '[name="ManLoadNext5"]', function () {
        $('body').find('div.material-tooltip').remove();
        var who = $(this).attr('data-val');
        var page = 0;
        switch (who) {
            case 'articled':
                artPage++;
                page = artPage;
                break;
            case 'applied':
                afrPage++;
                page = afrPage;
                break;
            default:
                appPage++;
                page = appPage;
        }

        var EmployeePaging = {
            Who: who,
            PageNo: page,
            PageSize: pageSize,
            Under: $(this).attr('data-info')
        };

        $.ajax({
            url: '/ManagersBoard/SendPartOfStaff',
            type: "POST",
            dataType: "html",
            data: JSON.stringify(EmployeePaging),
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                $('#' + who + 'Div').empty();
                $('#' + who + 'Btns').remove();
                $('#' + who + 'Div').append(msg);
                $('.tooltipped').tooltip({ delay: 50 });
            }
        });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '[name="ManLoadBack"]', function () {
        $('body').find('div.material-tooltip').remove();
        var who = $(this).attr('data-val');
        var page = 0;
        switch (who) {
            case 'articled':
                artPage--;
                page = artPage;
                break;
            case 'applied':
                afrPage--;
                page = afrPage;
                break;
            default:
                appPage--;
                page = appPage;
        }

        var EmployeePaging = {
            Who: who,
            PageNo: page,
            PageSize: pageSize,
            Under: $(this).attr('data-info')
        };

        $.ajax({
            url: '/ManagersBoard/SendPartOfStaff',
            type: "POST",
            dataType: "html",
            data: JSON.stringify(EmployeePaging),
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                $('#' + who + 'Div').empty();
                $('#' + who + 'Btns').remove();
                $('#' + who + 'Div').append(msg);
                $('.tooltipped').tooltip({ delay: 50 });
            }
        });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '[name="ManFirstPage"]', function () {
        $('body').find('div.material-tooltip').remove();
        var who = $(this).attr('data-val');
        var page = 0;
        switch (who) {
            case 'articled':
                artPage = 1;
                page = artPage;
                break;
            case 'applied':
                afrPage = 1;
                page = afrPage;
                break;
            default:
                appPage = 1;
                page = appPage;
        }
        var EmployeePaging = {
            Who: who,
            PageNo: page,
            PageSize: pageSize,
            Under: $(this).attr('data-info')
        };

        $.ajax({
            url: '/ManagersBoard/SendPartOfStaff',
            type: "POST",
            dataType: "html",
            data: JSON.stringify(EmployeePaging),
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                $('#' + who + 'Div').empty();
                $('#' + who + 'Btns').remove();
                $('#' + who + 'Div').append(msg);
                $('.tooltipped').tooltip({ delay: 50 });
            }
        });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    var pAppPage = 1;
    $('body').on('click', '#YourStudentsApps2', function () {
        var a = $(this).parent();
        if (a[0].nodeName.toLowerCase() == 'li') {
            pAppPage = 1;
            HighlightSelectedSideNav($(this));
        }
        else {
            if ($(this).val() == 'Back') {
                var page = $(this).attr('data-val');
                if (page == 0) {
                    pAppPage = 1;
                }
                else {
                    pAppPage = page;
                }
            }
            else {
                pAppPage++;
            }
        }

        $('body').find('div.material-tooltip').remove();
        var ApplicationPaging = {
            PageNo: pAppPage,
            PageSize: 10
        };

        $.ajax({
            url: '/PartnersBoard/SeeApplications',
            type: "POST",
            dataType: "html",
            data: JSON.stringify(ApplicationPaging),
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                $('#PartnersBoardContent').empty();
                $('#Partnerspinner').show();
                $('#PartnersBoardContent').html(msg).promise().done(function () {
                    $('#Partnerspinner').hide();
                    $('.tooltipped').tooltip({ delay: 50 });
                });

            }
        });
        $('.tooltipped').tooltip({ delay: 50 });

    });

    $('body').on('click', '#YourStudentsAppsBack', function () {
        mAppPage--;
        $('body').find('div.material-tooltip').remove();
        var ApplicationPaging = {
            PageNo: mAppPage,
            PageSize: 10
        };
        console.log(ApplicationPaging);
        $.ajax({
            url: '/ManagersBoard/SeeApplications',
            type: "POST",
            dataType: "html",
            data: JSON.stringify(ApplicationPaging),
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                $('#ManagersBoardContent').empty();
                HighlightSelectedSideNav($(this));
                $('#Managerspinner').show();
                $('#ManagersBoardContent').html(msg).promise().done(function () {
                    $('#Managerspinner').hide();
                });
                $('.tooltipped').tooltip({ delay: 50 });
            }
        });
        $('.tooltipped').tooltip({ delay: 50 });

    });

    $('body').on('click', '#Applied2Back', function () {
        myAppPage--;
        $('body').find('div.material-tooltip').remove();
        var ApplicationPaging = {
            PageNo: myAppPage,
            PageSize: 10
        };
        console.log(ApplicationPaging);
        $.ajax({
            url: '/ManagersBoard/MyApplications',
            type: "POST",
            dataType: "html",
            data: JSON.stringify(ApplicationPaging),
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                $('#ManagersBoardContent').empty();
                $('#Managerspinner').show();
                $('#ManagersBoardContent').html(msg).promise().done(function () {
                    $('#Managerspinner').hide();
                });
                $('.tooltipped').tooltip({ delay: 50 });
            }
        });
        $('.tooltipped').tooltip({ delay: 50 });

    });

    $('body').on('click', '#YourStudentsApps2Back', function () {
        pAppPage--;
        $('body').find('div.material-tooltip').remove();
        var ApplicationPaging = {
            PageNo: pAppPage,
            PageSize: 10
        };

        $.ajax({
            url: '/PartnersBoard/SeeApplications',
            type: "POST",
            dataType: "html",
            data: JSON.stringify(ApplicationPaging),
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                $('#PartnersBoardContent').empty();
                $('#Partnerspinner').show();
                $('#PartnersBoardContent').html(msg).promise().done(function () {
                    $('#Partnerspinner').hide();
                });
                $('.tooltipped').tooltip({ delay: 50 });
            }
        });
        $('.tooltipped').tooltip({ delay: 50 });

    });

    $('body').on('click', '#AppliedBack', function () {
        myAppPage1--;
        $('body').find('div.material-tooltip').remove();
        var ApplicationPaging = {
            PageNo: myAppPage1,
            PageSize: 10
        };

        $.ajax({
            url: '/StudentsBoard/SeeApplications',
            type: "POST",
            dataType: "html",
            data: JSON.stringify(ApplicationPaging),
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                $('#StudentsBoard').empty();

                $('#StudentSpinner').show();
                $('#StudentsBoard').html(msg).promise().done(function () {
                    $('#StudentSpinner').hide();
                });
                $('.tooltipped').tooltip({ delay: 50 });
            }
        });

        $('.tooltipped').tooltip({ delay: 50 });

    });

    var myAppPage1 = 1;
    $('body').on('click', '#Applied', function () {
        var a = $(this).parent();
        if (a[0].nodeName.toLowerCase() == 'li') {
            myAppPage1 = 1;
            HighlightSelectedSideNav($(this));
        }
        else {
            if ($(this).val() == 'Back') {
                var page = $(this).attr('data-val');
                if (page == 0) {
                    myAppPage1 = 1;
                }
                else {
                    myAppPage1 = page;
                }
            }
            else {
                myAppPage1++;
            }
        }

        $('body').find('div.material-tooltip').remove();
        var ApplicationPaging = {
            PageNo: myAppPage1,
            PageSize: 10
        };
        $.ajax({
            url: '/StudentsBoard/SeeApplications',
            type: "POST",
            dataType: "html",
            data: JSON.stringify(ApplicationPaging),
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                $('#StudentsBoard').empty();
                $('#StudentSpinner').show();
                $('#StudentsBoard').html(msg).promise().done(function () {
                    $('#StudentSpinner').hide();
                });
                $('.tooltipped').tooltip({ delay: 50 });
            }
        });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    var myAppPage = 1;
    $('body').on('click', '#Applied2', function () {
        var a = $(this).parent();
        if (a[0].nodeName.toLowerCase() == 'li') {
            myAppPage = 1;
            HighlightSelectedSideNav($(this));
        }
        else {
            if ($(this).val() == 'Back') {
                var page = $(this).attr('data-val');
                if (page == 0) {
                    myAppPage = 1;
                }
                else {
                    myAppPage = page;
                }
            }
            else {
                myAppPage++;
            }
        }

        $('body').find('div.material-tooltip').remove();
        var ApplicationPaging = {
            PageNo: myAppPage,
            PageSize: 10
        };
        $.ajax({
            url: '/ManagersBoard/MyApplications',
            type: "POST",
            dataType: "html",
            data: JSON.stringify(ApplicationPaging),
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                $('#ManagersBoardContent').empty();

                $('#Managerspinner').show();
                $('#ManagersBoardContent').html(msg).promise().done(function () {
                    $('#Managerspinner').hide();
                });
                $('.tooltipped').tooltip({ delay: 50 });
            }
        });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    var joinLetterPage, lettersLot;
    joinLetterPage = 1; lettersLot = 10;
    $('body').on('click', '[name="nextJoining"]', function () {
        $('body').find('div.material-tooltip').remove();
        joinLetterPage++;
        var ApplicationPaging = {
            PageNo: joinLetterPage,
            PageSize: lettersLot
        };
        $.ajax({
            url: '/AdminsBoard/SeeLetters',
            type: "POST",
            dataType: "html",
            data: JSON.stringify(ApplicationPaging),
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                $('#letterDiv').empty();
                //$('#AdminSpinner').show();
                $('#letterDiv').html(msg).promise().done(function () {
                    //$('#AdminSpinner').hide();
                });
                $('.tooltipped').tooltip({ delay: 50 });
            }
        });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '[name="backJoining"]', function () {
        $('body').find('div.material-tooltip').remove();
        joinLetterPage--;
        var ApplicationPaging = {
            PageNo: joinLetterPage,
            PageSize: lettersLot
        };
        $.ajax({
            url: '/AdminsBoard/SeeLetters',
            type: "POST",
            dataType: "html",
            data: JSON.stringify(ApplicationPaging),
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                $('#letterDiv').empty();
                //$('#AdminSpinner').show();
                $('#letterDiv').html(msg).promise().done(function () {
                    //$('#AdminSpinner').hide();
                });
                $('.tooltipped').tooltip({ delay: 50 });
            }
        });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '#CheckApplication2', function () {
        var ApplicationReading = {
            Sl: $(this).attr('data-val'),
            PageNo: $('#YourStudentsApps2Back').attr('data-val')
        };
        //var StudentId = { id: $(this).attr('data-val') };
        $('body').find('div.material-tooltip').remove();
        $.ajax({
            url: '/PartnersBoard/CheckApplication',
            type: "POST",
            data: JSON.stringify(ApplicationReading),
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                if (msg == "Updated") {
                    $('#mainContent').empty();
                    $('#spinner').show();
                    $('#mainContent').load('/PartnersBoard/Index', function () {
                        $('#spinner').hide();
                        //HighlightSelectedSideNav();
                        $('#YourStudentsApps2').parent().addClass('orange lighten-3');
                        $('#PartnersBoardContent').empty();
                        $('#Partnerspinner').show();

                        $('#PartnersBoardContent').load('/PartnersBoard/ReadApplication', function () {
                            $('#Partnerspinner').hide();
                            $('.tooltipped').tooltip({ delay: 50 });
                            if ($('#PartnersBoardContent').find('#PartnerNoteForm').length > 0) {
                                $('#PartnerNoteForm').validate(partnernoteonapplicationvalidation);

                            }
                        });
                    });
                }
                else {
                    alert(msg);
                }
            }
        });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '#CheckApplication3', function () {

        var ApplicationReading = {
            Sl: $(this).attr('data-val'),
            PageNo: $('#AppliedBack').attr('data-val')
        };

        $.ajax({
            url: '/StudentsBoard/CheckApplication',
            type: "POST",
            data: JSON.stringify(ApplicationReading),
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                $('#StudentsBoard').empty();
                $('#StudentSpinner').show();
                $('#StudentsBoard').load('/StudentsBoard/ReadApplication', function () {
                    $('#StudentSpinner').hide();
                    $('.tooltipped').tooltip({ delay: 50 });
                });
            }
        });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '#CheckApplication4', function () {
        $('body').find('div.material-tooltip').remove();
        var ApplicationReading = {
            Sl: $(this).attr('data-val'),
            PageNo: $('#Applied2Back').attr('data-val')
        };

        $.ajax({
            url: '/ManagersBoard/CheckMyApplication',
            type: "POST",
            data: JSON.stringify(ApplicationReading),
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                $('#ManagersBoardContent').empty();
                $('#Managerspinner').show();
                $('#ManagersBoardContent').load('/ManagersBoard/ReadMyApplication', function () {
                    $('#Managerspinner').hide();
                    $('.tooltipped').tooltip({ delay: 50 });
                });
            }
        });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '[name="SeeStaffDetail"]', function () {
        $('body').find('div.material-tooltip').remove();
        var StudentId = { id: $(this).attr('data-val') };

        $.ajax({
            url: '/PartnersBoard/ProcessStaffDetail',
            type: "POST",
            data: JSON.stringify(StudentId),
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                if (msg == "Success") {
                    $('#PartnersBoardContent').empty();
                    $('#Partnerspinner').show();
                    $('#PartnersBoardContent').load('/PartnersBoard/SeeStaffDetail', function () {
                        $('.tooltipped').tooltip({ delay: 50 });
                        $('.collapsible').collapsible();
                        $('#Partnerspinner').hide();
                    });
                }
                else {
                    alert(msg);
                }
            }
        });
    });

    $('body').on('click', '[name="SeeStudentDetail"]', function () {
        var StudentId = { id: $(this).attr('data-val') };
        $('body').find('div.material-tooltip').remove();
        $.ajax({
            url: '/ManagersBoard/ProcessStudentDetail',
            type: "POST",
            data: JSON.stringify(StudentId),
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                if (msg == "Success") {
                    $('#ManagersBoardContent').empty();
                    $('#Managerspinner').show();
                    $('#ManagersBoardContent').load('/ManagersBoard/SeeDetailOfStudent', function () {
                        $('.collapsible').collapsible();
                        $('#Managerspinner').hide();
                        $('.tooltipped').tooltip({ delay: 50 });
                    });
                }
                else {
                    alert(msg);
                }
            }
        });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '[name="SeeStudentDetail2"]', function () {
        $('body').find('div.material-tooltip').remove();
        var StudentId = { id: $(this).attr('data-val') };

        $.ajax({
            url: '/AdminsBoard/ProcessStudentDetail',
            type: "POST",
            data: JSON.stringify(StudentId),
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                if (msg == "Success") {
                    $('#AdminsBoardContent').empty();
                    $('#Adminspinner').show();
                    $('#AdminsBoardContent').load('/AdminsBoard/SeeDetailOfStudent', function () {
                        $('.tooltipped').tooltip({ delay: 50 });
                        $('.collapsible').collapsible();
                        $('#Adminspinner').hide();
                    });
                }
                else {
                    alert(msg);
                }
            }
        });
    });

    $('body').on('click', '[name="SeeExStudentDetail2"]', function () {
        $('body').find('div.material-tooltip').remove();
        var StudentId = { id: $(this).attr('data-val') };

        $.ajax({
            url: '/AdminsBoard/ProcessStudentDetail',
            type: "POST",
            data: JSON.stringify(StudentId),
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                if (msg == "Success") {
                    $('#AdminsBoardContent').empty();
                    $('#Adminspinner').show();
                    $('#AdminsBoardContent').load('/AdminsBoard/SeeDetailOfExStudent', function () {
                        $('.tooltipped').tooltip({ delay: 50 });
                        $('.collapsible').collapsible();
                        $('#Adminspinner').hide();
                    });
                }
                else {
                    alert(msg);
                }
            }
        });
    });

    $('body').on('click', '[name="SeeExStudentDetail3"]', function () {
        $('body').find('div.material-tooltip').remove();
        var StudentId = { id: $(this).attr('data-val') };

        $.ajax({
            url: '/PartnersBoard/ProcessStudentDetail',
            type: "POST",
            data: JSON.stringify(StudentId),
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                if (msg == "Success") {
                    $('#PartnersBoardContent').empty();
                    $('#Partnerspinner').show();
                    $('#PartnersBoardContent').load('/PartnersBoard/SeeDetailOfExStudent', function () {
                        $('.tooltipped').tooltip({ delay: 50 });
                        $('.collapsible').collapsible();
                        $('#Partnerspinner').hide();
                    });
                }
                else {
                    alert(msg);
                }
            }
        });
    });

    $('body').on('click', '#ExStudentCV', function () {
        empPage = ccPage = artPage = afrPage = partPage = appPage = 1;
        $('body').find('div.material-tooltip').remove();
        $('#AdminsBoardContent').empty();
        HighlightSelectedSideNav($(this));
        $('#Adminspinner').show();
        $('#AdminsBoardContent').load('/AdminsBoard/ReturnExStudentList', function () {
            $('.tooltipped').tooltip({ delay: 50 });
            $('#Adminspinner').hide();
        });
    });

    $('body').on('click', '#ExStudentCV2', function () {
        empPage = ccPage = artPage = afrPage = partPage = appPage = 1;
        $('body').find('div.material-tooltip').remove();
        $('#PartnersBoardContent').empty();
        HighlightSelectedSideNav($(this));
        $('#Partnerspinner').show();
        $('#PartnersBoardContent').load('/PartnersBoard/ReturnExStudentList', function () {
            $('.tooltipped').tooltip({ delay: 50 });
            $('#Partnerspinner').hide();
        });
    });

    $('body').on('click', '#OthersStaffs', function () {
        empPage = ccPage = artPage = afrPage = partPage = appPage = 1;
        $('body').find('div.material-tooltip').remove();
        $('#PartnersBoardContent').empty();
        HighlightSelectedSideNav($(this));
        $('#Partnerspinner').show();
        $('#PartnersBoardContent').load('/PartnersBoard/SeeOthersStaffs', function () {
            $('.tooltipped').tooltip({ delay: 50 });
            $('#Partnerspinner').hide();
        });
    });

    $('body').on('click', '#MyStaffs', function () {
        empPage = ccPage = artPage = afrPage = partPage = appPage = 1;
        $('body').find('div.material-tooltip').remove();
        $('#PartnersBoardContent').empty();
        HighlightSelectedSideNav($(this));
        $('#Partnerspinner').show();
        $('#PartnersBoardContent').load('/PartnersBoard/SeeStaffs', function () {
            $('.tooltipped').tooltip({ delay: 50 });
            $('#Partnerspinner').hide();
        });
    });

    $('body').on('click', '#Partners', function () {
        $('#PartnersBoardContent').empty();
        HighlightSelectedSideNav($(this));
        $('#Partnerspinner').show();
        $('#PartnersBoardContent').load('/PartnersBoard/ReturnPartners', function () {
            $('#Partnerspinner').hide();
        });
    });

    $('body').on('click', '#ViewPartners', function () {
        $('#AdminsBoardContent').empty();
        HighlightSelectedSideNav($(this));
        $('#Adminspinner').show();
        $('#AdminsBoardContent').load('/AdminsBoard/ReturnPartners', function () {
            $('#Adminspinner').hide();
        });
    });

    $('body').on('click', '#YourStudents', function () {
        artPage = afrPage = appPage = 1;
        $('body').find('div.material-tooltip').remove();
        $('#ManagersBoardContent').empty();
        HighlightSelectedSideNav($(this));
        $('#Managerspinner').show();
        $('#ManagersBoardContent').load('/ManagersBoard/SeeStudents', function () {
            $('.tooltipped').tooltip({ delay: 50 });
            $('#Managerspinner').hide();
        });
    });

    $('body').on('click', '[name="SeeStudentCV"]', function () {
        $('body').find('div.material-tooltip').remove();
        var StudentId = { Id: $(this).attr('data-val') };
        console.log(StudentId);
        $.ajax({
            url: '/AdminsBoard/ReadyStudentCV',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(StudentId),
            contentType: 'application/json; charset=utf-8',
            success: function (result) {
                $('#AdminsBoardContent').empty();
                $('#Adminspinner').show();
                $('#AdminsBoardContent').load('/AdminsBoard/GetStudentCV', function () {
                    $('.tooltipped').tooltip({ delay: 50 });
                    $('#Adminspinner').hide();
                });
            },
            error: function (xhr, status, p3, p4) {
                var err = "Error " + " " + status + " " + p3 + " " + p4;
                if (xhr.responseText && xhr.responseText[0] == "{")
                    err = JSON.parse(xhr.responseText).Message;
                console.log(err);
            }
        });
    });

    $('body').on('click', '[name="SeeStudentCV2"]', function () {
        $('body').find('div.material-tooltip').remove();
        var StudentId = { Id: $(this).attr('data-val') };
        $.ajax({
            url: '/PartnersBoard/ReadyStudentCV',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(StudentId),
            contentType: 'application/json; charset=utf-8',
            success: function (result) {
                $('#PartnersBoardContent').empty();
                $('#Partnerspinner').show();
                $('#PartnersBoardContent').load('/PartnersBoard/GetStudentCV', function () {
                    $('.tooltipped').tooltip({ delay: 50 });
                    $('#Partnerspinner').hide();
                });

            },
            error: function (xhr, status, p3, p4) {
                var err = "Error " + " " + status + " " + p3 + " " + p4;
                if (xhr.responseText && xhr.responseText[0] == "{")
                    err = JSON.parse(xhr.responseText).Message;
                console.log(err);
            }
        });
    });

    $('body').on('click', '[name="ViewStaffCV"]', function () {
        $('body').find('div.material-tooltip').remove();
        var StudentId = { Id: $(this).attr('value') };
        $.ajax({
            url: '/PartnersBoard/ReadyStudentCV',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(StudentId),
            contentType: 'application/json; charset=utf-8',
            success: function (result) {
                $('#PartnersBoardContent').empty();
                $('#Partnerspinner').show();
                $('#PartnersBoardContent').load('/PartnersBoard/GetStudentCV', function () {
                    $('.tooltipped').tooltip({ delay: 50 });
                    $('#Partnerspinner').hide();
                });

            },
            error: function (xhr, status, p3, p4) {
                var err = "Error " + " " + status + " " + p3 + " " + p4;
                if (xhr.responseText && xhr.responseText[0] == "{")
                    err = JSON.parse(xhr.responseText).Message;
                console.log(err);
            }
        });
    });

    $('body').on('click', '[name="SeeApplication"]', function () {
        $('body').find('div.material-tooltip').remove();
        var StudentId = { Id: $(this).attr('data-val') };
        $.ajax({
            url: '/AdminsBoard/ReadyStudentAppRecovered',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(StudentId),
            contentType: 'application/json; charset=utf-8',
            success: function (result) {
                $('#AdminsBoardContent').empty();
                $('#Adminspinner').show();
                $('#AdminsBoardContent').load('/AdminsBoard/GetStudentApplication', function () {
                    $('.tooltipped').tooltip({ delay: 50 });
                    $('#Adminspinner').hide();
                });
            },
            error: function (xhr, status, p3, p4) {
                var err = "Error " + " " + status + " " + p3 + " " + p4;
                if (xhr.responseText && xhr.responseText[0] == "{")
                    err = JSON.parse(xhr.responseText).Message;
                console.log(err);
            }
        });
    });

    $('body').on('click', '[name="SeeApplication2"]', function () {
        $('body').find('div.material-tooltip').remove();
        var StudentId = { Id: $(this).attr('data-val') };
        $.ajax({
            url: '/PartnersBoard/ReadyStudentAppRecovered',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(StudentId),
            contentType: 'application/json; charset=utf-8',
            success: function (result) {
                $('#PartnersBoardContent').empty();
                $('#Partnerspinner').show();
                $('#PartnersBoardContent').load('/PartnersBoard/GetStudentApplication', function () {
                    $('.tooltipped').tooltip({ delay: 50 });
                    $('#Partnerspinner').hide();
                });
            },
            error: function (xhr, status, p3, p4) {
                var err = "Error " + " " + status + " " + p3 + " " + p4;
                if (xhr.responseText && xhr.responseText[0] == "{")
                    err = JSON.parse(xhr.responseText).Message;
                console.log(err);
            }
        });
    });

    $('body').on('click', '[name="SeeJoiningLetter"]', function () {
        $('body').find('div.material-tooltip').remove();
        var StudentId = { Id: $(this).attr('data-val') };
        $.ajax({
            url: '/AdminsBoard/ReadyJoiningLetter',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(StudentId),
            contentType: 'application/json; charset=utf-8',
            success: function (result) {
                $('#AdminsBoardContent').empty();
                $('#Adminspinner').show();
                $('#AdminsBoardContent').load('/AdminsBoard/GeJoiningLetter', function () {
                    $('.tooltipped').tooltip({ delay: 50 });
                    $('#Adminspinner').hide();
                });
            },
            error: function (xhr, status, p3, p4) {
                var err = "Error " + " " + status + " " + p3 + " " + p4;
                if (xhr.responseText && xhr.responseText[0] == "{")
                    err = JSON.parse(xhr.responseText).Message;
                console.log(err);
            }
        });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '[name="UpdateInformation"]', function () {
        $('body').find('div.material-tooltip').remove();
        var StudentId = { Id: $('#ApplicantId').attr('data-val') };
        $.ajax({
            url: '/AdminsBoard/UpdateEmployee',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(StudentId),
            contentType: 'application/json; charset=utf-8',
            success: function (result) {
                if (result == "Updated") {
                    $('#mainContent').empty();
                    $('#spinner').show();
                    $('#mainContent').load('/AdminsBoard/Index', function () {
                        $('#spinner').hide();
                    });
                } else {
                    $('#errorMsg').html(result);
                }

            },
            error: function (xhr, status, p3, p4) {
                var err = "Error " + " " + status + " " + p3 + " " + p4;
                if (xhr.responseText && xhr.responseText[0] == "{")
                    err = JSON.parse(xhr.responseText).Message;
                console.log(err);
            }
        });
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '#btnAcceptApplicant', function () {
        $('body').find('div.material-tooltip').remove();
        if ($('body').find('#NewApplicantJoining').length == 0) {
            $('#ApplicantsBoard').empty();
            $('#ApplicantsBoardspinner').show();
            $('#ApplicantsBoard').load('/AdminsBoard/Joining', function () {
                $('#ApplicantsBoardspinner').hide();
                if ($('#btnJoining').val() == 'Student') {
                    $('#SelectPartner').material_select();
                    $('#SelectManager').material_select();
                    $('#StudentJoiningForm').validate(studentjoiningvalidation);
                    $('.tooltipped').tooltip({ delay: 50 });
                }
                else {
                    $('#SelectPartner').material_select();
                    $('#SelectDepartment').material_select();
                    $('#SelectPosition').material_select();
                    $('#EmployeeJoiningForm').validate(employeejoiningvalidation);
                    $('.tooltipped').tooltip({ delay: 50 });
                }
            });
        }
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '#btnRejectApplicant', function () {
        $('#ConfirmRejectionModal').closeModal();
        $('body').find('div.material-tooltip').remove();
        var StudentId = { id: $(this).val() };
        $.ajax({
            url: '/AdminsBoard/RejectApplicant',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(StudentId),
            contentType: 'application/json; charset=utf-8',
            success: function (result) {
                if (result == "Updated") {
                    $('#mainContent').empty();
                    $('#spinner').show();
                    $('#mainContent').load('/AdminsBoard/Index', function () {
                        $('#spinner').hide();
                    });
                }
                $('.tooltipped').tooltip({ delay: 50 });
            },
            error: function (xhr, status, p3, p4) {
                var err = "Error " + " " + status + " " + p3 + " " + p4;
                if (xhr.responseText && xhr.responseText[0] == "{")
                    err = JSON.parse(xhr.responseText).Message;
                console.log(err);
            }
        });
    });

    $('body').on('click', '#AddMemberOrganisation', function () {
        $('#MembersOrgAddModal').openModal();
        $('#MembersOrgAdd').validate(membersOrgName);
    });

    $('body').on('click', '#AddtxtMembersOrgNameToList', function () {
        if ($('#MembersOrgAdd').valid()) {
            var UniversityName = { Name: $('#MembersOrgName').val() };
            $('#MembersOrgName').val('');
            $.ajax({
                url: '/Objective/AddMembersOrgName',
                type: "POST",
                data: JSON.stringify(UniversityName),
                contentType: 'application/json; charset=utf-8',
                success: function (msg) {
                    if (msg == 'exists') {
                        $('#txtMembersOrgNamemsg').html('Name exists');
                    }
                    else {
                        var x = $('[title="MebersOrg"]').last();
                        x.append($("<option></option>")
                            .attr("value", msg.Id)
                            .text(msg.Organisation)
                         );
                        x.material_select();
                        $('#MembersOrgAddModal').closeModal();
                    }
                }
            });
        }
    });

    $('body').on('click', '#AddBachelorUniversity', function () {
        $('#BachelorUniModal').openModal();
        $('#BachelorUniAdd').validate(bachelorUniversity);
    });

    $('body').on('click', '#AddBachelorUniToList', function () {
        if ($('#BachelorUniAdd').valid()) {
            var UniversityName = { Name: $('#BachelorUniversityName').val() };
            $('#BachelorUniversityName').val('');
            $.ajax({
                url: '/Education/AddUni',
                type: "POST",
                data: JSON.stringify(UniversityName),
                contentType: 'application/json; charset=utf-8',
                success: function (msg) {

                    if (msg == 'exists') {
                        $('#bacheloruniaddmsg').html('Name exists');
                    }
                    else {
                        $('#BachelorUniversity').append($("<option></option>")
                            .attr("value", msg.Id)
                            .text(msg.Name)
                         );
                        $('#BachelorUniversity').material_select();
                        $('#BachelorUniModal').closeModal();
                    }
                }
            });
        }
    });

    $('body').on('click', '#AddMasterUniversity', function () {
        $('#UniModal').openModal();
        $('#MasterUniAdd').validate(masterUniversity);
    });

    $('body').on('click', '#AddMasterUniToList', function () {
        if ($('#MasterUniAdd').valid()) {
            var UniversityName = { Name: $('#MasterUniversityName').val() };
            $('#MasterUniversityName').val('');
            $.ajax({
                url: '/Education/AddUni',
                type: "POST",
                data: JSON.stringify(UniversityName),
                contentType: 'application/json; charset=utf-8',
                success: function (msg) {
                    if (msg == 'exists') {
                        $('#uniaddmsg').html('Name exists');
                    }
                    else {
                        $('#MasterUniversity').append($("<option></option>")
                            .attr("value", msg.Id)
                            .text(msg.Name)
                         );
                        $('#MasterUniversity').material_select();
                        $('#UniModal').closeModal();
                    }
                }
            });
        }
    });

    $('body').on('change', '#Addressee', function () {
        var AddresseeId = { Id: $(this).val() };
        $.ajax({
            url: 'StudentsBoard/ReturnDesignation',
            type: "POST",
            data: JSON.stringify(AddresseeId),
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                $('#Designation').html(msg);
            }
        });
    });

    $('body').on('change', '#SelectDepartment', function () {
        var DepartmentId = { Id: $(this).val() };
        $.ajax({
            url: '/AdminsBoard/ReturnPositions',
            type: "POST",
            data: JSON.stringify(DepartmentId),
            contentType: 'application/json; charset=utf-8',
            success: function (msg) {
                $('#SelectPosition').empty().html();
                $('#SelectPosition').append($("<option disabled selected></option>")
                            .attr("value", '')
                            .text('Choose')
                         );
                for (var i = 0; i < msg.length; i++) {
                    $('#SelectPosition').append($("<option></option>")
                            .attr("value", msg[i].status.Id)
                            .text(msg[i].status.Name)
                         );
                }
                $('#SelectPosition').material_select();
            }
        });
    });

    $('body').on('click', '#btnJoining', function () {
        $('body').find('div.material-tooltip').remove();
        var who = $(this).val();
        if (who == 'Student') {
            if ($('#StudentJoiningForm').valid()) {
                var EmployeeJoining = {
                    EmployeeId: $('#ApplicantId').attr('data-val'),
                    PartnerId: $('#SelectPartner').val(),
                    ManagerId: $('#SelectManager').val(),
                    UserName: $('[title="InitUserName"]').val(),
                    Password: $('[title="InitPassword"]').val()
                }
                $.ajax({
                    url: '/AdminsBoard/StudentJoin',
                    type: "POST",
                    data: JSON.stringify(EmployeeJoining),
                    contentType: 'application/json; charset=utf-8',
                    success: function (msg) {
                        if (msg == "Inserted") {
                            $('#mainContent').empty();
                            $('#spinner').show();
                            $('#mainContent').load('/AdminsBoard/Index', function () {
                                $('#spinner').hide();
                            });
                        }
                        else if (msg = "Exists") {
                            $('#msg4EmployeeJoin').empty();
                            $('#msg4EmployeeJoin').html("Try a different Username<br/><br/>");
                        }
                        else {
                            $('#msg4EmployeeJoin').empty();
                            $('#msg4EmployeeJoin').html(msg);
                        }
                    }
                });
            }
        }
        else {
            if ($('#EmployeeJoiningForm').valid()) {
                var EmployeeJoining = {
                    EmployeeId: $('#ApplicantId').attr('data-val'),
                    PartnerId: $('#SelectPartner').val(),
                    DepartmentId: $('#SelectDepartment').val(),
                    StatusId: $('#SelectPosition').val(),
                    UserName: $('[title="InitUserName"]').val(),
                    Password: $('[title="InitPassword"]').val()
                };

                $.ajax({
                    url: '/AdminsBoard/EmployeeJoin',
                    type: "POST",
                    data: JSON.stringify(EmployeeJoining),
                    contentType: 'application/json; charset=utf-8',
                    success: function (msg) {
                        if (msg == "Inserted") {
                            $('#mainContent').empty();
                            $('#spinner').show();
                            $('#mainContent').load('/AdminsBoard/Index', function () {
                                $('#spinner').hide();
                            });
                        }
                        else {
                            alert(msg);
                        }
                    }
                });
            }
        }
        $('.tooltipped').tooltip({ delay: 50 });
    });

    $('body').on('click', '#CloseBachelorUniAdd', function () {
        $('#bacheloruniaddmsg').empty();
        $('#BachelorUniversityName').val('');
        $('#BachelorUniModal').closeModal();
    });

    $('body').on('click', '#CloseMasterUniAdd', function () {
        $('#uniaddmsg').empty();
        $('#MasterUniversityName').val('');
        $('#UniModal').closeModal();
    });

    $('body').on('click', '#ClosetxtMembersOrgAdd', function () {
        $('#txtMembersOrgNamemsg').empty();
        $('#MembersOrgName').val('');
        $('#MembersOrgAddModal').closeModal();
    });

    $('body').on('click', '#AddApplicationType', function () {
        $('#AppSubModal').openModal();
        $('#AppSubjectAdd').validate(applicationSubject);
    });

    $('body').on('click', '#AddAppSubToList', function () {
        if ($('#AppSubjectAdd').valid()) {
            var UniversityName = { Name: $('#txtAppSubject').val() };
            $('#txtAppSubject').val('');
            $.ajax({
                url: '/StudentsBoard/AddApplicationSubject',
                type: "POST",
                data: JSON.stringify(UniversityName),
                contentType: 'application/json; charset=utf-8',
                success: function (msg) {
                    if (msg == 'exists') {
                        $('#appsubaddmsg').html('Subject exists');
                    }
                    else {
                        $('#AppSubject').append($("<option></option>")
                            .attr("value", msg.Id)
                            .text(msg.Type)
                         );
                        $('#AppSubject').material_select();
                        $('#AppSubModal').closeModal();
                    }
                }
            });
        }
    });

    $('body').on('click', '#CloseAppSubAdd', function () {
        $('#appsubaddmsg').empty();
        $('#txtAppSubject').val('');
        $('#AppSubModal').closeModal();
    });

    $('body').on('click', '#AddApplicationType2', function () {
        $('#AppSubModal').openModal();
        $('#AppSubjectAdd').validate(applicationSubject);
    });

    $('body').on('click', '#AddAppSubToList2', function () {
        if ($('#AppSubjectAdd').valid()) {
            var UniversityName = { Name: $('#txtAppSubject2').val() };
            $('#txtAppSubject').val('');
            $.ajax({
                url: '/ManagersBoard/AddApplicationSubject',
                type: "POST",
                data: JSON.stringify(UniversityName),
                contentType: 'application/json; charset=utf-8',
                success: function (msg) {
                    if (msg == 'exists') {
                        $('#appsubaddmsg').html('Subject exists');
                    }
                    else {
                        $('#AppSubject').append($("<option></option>")
                            .attr("value", msg.Id)
                            .text(msg.Type)
                         );
                        $('#AppSubject').material_select();
                        $('#AppSubModal').closeModal();
                    }
                }
            });
        }
    });

    $('body').on('click', '#CloseAppSubAdd2', function () {
        $('#appsubaddmsg').empty();
        $('#txtAppSubject').val('');
        $('#AppSubModal').closeModal();
    });
});

function HighlightSelectedSideNav(selector) {
    var lis = $(selector).parent().siblings();
    lis.removeClass('orange lighten-3');
    $(selector).parent().addClass('orange lighten-3');
};

function HighlightSelectedApplication(anchor) {
    $(anchor).parents('tr').addClass('orange lighten-3');
    $(anchor).parents('tr').siblings().removeClass('orange lighten-3');
}

