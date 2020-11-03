let edit;

$(document).ready(function () {
    $("#distanceDiv").hide();
})

$("#isAerobic").change(function() {
    $("#distanceDiv").toggle();
})

$("#setsReps").change(function() {
    $("#setsRepsDiv").toggle();
})

$("#bodyweight").change(function() {
    $("#weightDiv").toggle();
})

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

    console.log(data);
    if(edit) {
        data.activityid = $("#activitySubmit").data('activityid');
        $.ajax({
            url: "/activityUpdate",
            type: "PUT",
            data: data
        }).then(function(err, res){
            if(err) console.log(err);
            console.log("activity was updated")
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