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

    $.ajax("/activity", {
        type: 'POST',
        data: data
    }).then(function (result) {
        console.log(result);
    })
})