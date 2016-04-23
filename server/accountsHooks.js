//called after successful account creation
//sets the users permissions
var assignUserSet = function(userId) {
	
};
AccountsTemplates.configure({
	postSignUpHook: assignUserSet
});