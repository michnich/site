Template.editStudentLevels.onCreated(function() {
    Session.set("html", 0);
    Session.set("css", 0);
    Session.set("js", 0);
    Session.set("devTools", 0);
})

Template.editStudentLevels.helpers({
    htmlLevels: function() {
        var htmlLevels = this.html;
        if (_.isEmpty(htmlLevels)) {
            return [{
                level: 1
            }];
        }
        Session.set("html", htmlLevels.length);
        return htmlLevels;
    },
    cssLevels: function() {
        var cssLevels = this.css;
        if (_.isEmpty(cssLevels)) {
            return [{
                level: 1
            }];
        }
        Session.set("css", cssLevels.length);
        return cssLevels;
    },
    jsLevels: function() {
        var jsLevels = this.js;
        if (_.isEmpty(jsLevels)) {
            return [{
                level: 1
            }];
        }
        Session.set("js", jsLevels.length);
        return jsLevels;
    },
    devToolsLevels: function() {
        var devToolsLevels = this.devTools;
        if (_.isEmpty(devToolsLevels)) {
            return [{
                level: 1
            }];
        }
        Session.set("devTolls", devTools.length);
        return devToolsLevels;
    }
});

Template.editStudentLevels.events({
    'submit form': function(e) {
        e.preventDefault();

        var htmlArray = $(e.target).find("[name=html_level]").map(function() {
            var level = {
                level: this.value,
                start: $(e.target).find("[name=html_" + this.value + "_start]").val(),
                est_end: $(e.target).find("[name=html_" + this.value + "_est_end]").val(),
                actual_end: $(e.target).find("[name=html_" + this.value + "_actual_end]").val()
            };
            return level;
        }).get();

        var cssArray = $(e.target).find("[name=css_level]").map(function() {
            var level = {
                level: this.value,
                start: $(e.target).find("[name=css_" + this.value + "_start]").val(),
                est_end: $(e.target).find("[name=css_" + this.value + "_est_end]").val(),
                actual_end: $(e.target).find("[name=css_" + this.value + "_actual_end]").val()
            };

            return level;
        }).get();

        var jsArray = $(e.target).find("[name=js_level]").map(function() {
            var level = {
                level: this.value,
                start: $(e.target).find("[name=js_" + this.value + "_start]").val(),
                est_end: $(e.target).find("[name=js_" + this.value + "_est_end]").val(),
                actual_end: $(e.target).find("[name=js_" + this.value + "_actual_end]").val()
            };

            return level;
        }).get();

        var devToolsArray = $(e.target).find("[name=devTools_level]").map(function() {
            var level = {
                level: this.value,
                start: $(e.target).find("[name=devTools_" + this.value + "_start]").val(),
                est_end: $(e.target).find("[name=devTools_" + this.value + "_est_end]").val(),
                actual_end: $(e.target).find("[name=devTools_" + this.value + "_actual_end]").val()
            };

            return level;
        }).get();
        Meteor.call("updateStudentProgress", this._id, htmlArray, cssArray, jsArray, devToolsArray, function(error, result) {
            if (error) {
                console.log("error", error);
            }
            if (result) {

            }
        });
    }
});
