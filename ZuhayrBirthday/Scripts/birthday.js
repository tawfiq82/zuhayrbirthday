function onclickSave() {
    $('#not-confirmed-guest-msg').html('');
    $adultCount = $('#adult-count');
    $childrenCount = $('#children-count');
    $infantCount = $('#infant-count');

    if ($adultCount.length) guestJson.ConfirmedAdultCount = $adultCount.val();
    if ($childrenCount.length) guestJson.ConfirmedChildrenCount = $childrenCount.val();
    if ($infantCount.length) guestJson.ConfirmedInfantCount = $infantCount.val();
    guestJson.IsConfirmed = true;

    $.ajax({
        url: saveUrl,
        data: JSON.stringify(guestJson),
        contentType: 'application/json; charset=utf-8',
        type: "POST",
        dataType: 'json',
        success: function (data) {
            if (data.Result == 'Success') {
                $('#not-confirmed-guest').hide();
                $('#confirmed-adult-count').html(guestJson.ConfirmedAdultCount);
                $('#confirmed-children-count').html(guestJson.ConfirmedChildrenCount);
                $('#confirmed-infant-count').html(guestJson.ConfirmedInfantCount);
                $('#confirmed-guest').show();
            } else {
                $('#not-confirmed-guest-msg').html('There is some error occured while saving. Please try again.');
            }
        }
    });
}

function onclickEdit() {
    $('#not-confirmed-guest').show();
    $('#confirmed-guest').hide();
}