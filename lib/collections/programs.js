Programs = new Mongo.Collection('programs');

if (Meteor.isServer){
  Meteor.publish("allPrograms", function(){
    return Programs.find();
  });
  Meteor.publish("programType", function(program){
    return Programs.find({program_type: program});
  });
  Meteor.publish("programById", function(id){
    return Programs.find({_id: id});
  });
}

/*program = {
  location: "address",
  type: "community center",
  times: {
    Thursday: {
      start: T17:00:00.000Z,
      end: T18:00:00.000Z,
    },
    Saturday: {
      start: T10:00:00.000Z,
      end: T11:00:00.000Z,
    }
  }
}*/

Meteor.methods({
  addProgram:function(program){

  },
  deleteProgram:function(program){

  }
});
