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
    if (this.checked) {
        $('#weight').prop('disabled', true); // If checked disable item                   
    } else {
        $('#weight').prop('disabled', false); // If checked enable item       
    }
})

$("#newActivity").on("submit", function (event) {
    event.preventDefault();

    const data = {};
    
    data.workoutid = $("#activitySubmit").data('workoutid');

    console.log(data.workoutid);
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

    $.ajax("/activity", {
        type: 'POST',
        data: data
    }).then(function (result) {
        location.reload();
    })
})

$(".activity-btn").on("click", function(event) {
    console.log("clicked");
    const workoutid = $(this).data('workoutid');
    console.log(workoutid);
    $("#activitySubmit").data('workoutid',workoutid);
})