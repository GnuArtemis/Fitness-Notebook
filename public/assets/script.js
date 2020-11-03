//Listener for whether the activity is being created or edited
let edit;

//By default, exercises are anaerobic, so distance is not displayed by default
$(document).ready(function () {
    $("#distanceDiv").hide();
})

//Displays activity creation based on whether or not the activity is aerobic or anaerobic
$("#isAerobic").change(function() {
    $("#distanceDiv").toggle();
})

//Displays activity creation based on whether or not the activity has sets and reps (eg weightlifting vs going for a run)
$("#setsReps").change(function() {
    $("#setsRepsDiv").toggle();
})

//Displays activity creation based on whether or not the activity uses weights (eg weightlifting vs going for a run)
$("#bodyweight").change(function() {
    $("#weightDiv").toggle();
})

//Grabs form values based on options, packs that into a data object to send in an ajax call.  If An activity is being created, adds the workout id so that the activity is added to the correct workout. If An activity is being edited, adds the activity id so the update targets the correct activity.
$("#newActivity").on("submit", function (event) {
    event.preventDefault();
    const data = {};
    
        data.name = $("#activityName").val();
    data.aerobic = $("#isAerobic").is(':checked');

    if (data.aerobic) {
        data.distance = $("#distance").val();
    }

    if (!($("#bodyweight").is(':checked'))) {
        data.weight = $("#weight").val();
    }

    if ($("#setsReps").is(':checked')) {
        data.sets = $("#sets").val();
        data.reps = $("#reps").val();
    }

    data.duration = $("#duration").val();

    if(edit) {
        data.activityid = $("#activitySubmit").data('activityid');
        $.ajax({
            url: "/activityUpdate",
            type: "PUT",
            data: data
        }).then(function(err, res){
            if(err) console.log(err);
            location.reload();
        })
    } else {
        data.workoutid = $("#activitySubmit").data('workoutid');
        $.ajax("/activity", {
            type: 'POST',
            data: data
        }).then(function (result) {
            location.reload();
        })
    }
})

//The "create an activity" modal is generated from many diffent spots: each workout can add acitivites, and each activity can be edited. This function tracks what should be changed and how and adds the correct information depending on origin.
$(".activity-btn").on("click", function(event) {
    const isNew = $(this).data('workoutid')
    console.log(isNew);
    if (isNew) {
        edit = false;
        const workoutid = $(this).data('workoutid');
        console.log(workoutid);
        $("#activitySubmit").data('workoutid',workoutid);
    }else if ($(this).data('activityid')){
        edit = true;
        const activityid = $(this).data('activityid')
        console.log(activityid);
        $("#activitySubmit").data('activityid',activityid);
    }
})