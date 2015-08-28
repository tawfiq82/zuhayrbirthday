var guestJson = null;

function login() {
    $('guest-login').hide();
    $mobileNo = $('mobile-no');
    guestJson = { PhoneId: $mobileNo.val() };
    $.ajax({
        url: loginUrl,
        data: JSON.stringify(guestJson),
        contentType: 'application/json; charset=utf-8',
        type: "POST",
        dataType: 'json',
        success: function (data) {
            if (data.Result == 'Success') {
                guestJson = data.JsonGuest;
                if (guestJson.IsConfirmed) {
                    $('#guest-confirmed').show();
                    $('#confirmed-adult-count').html(guestJson.ConfirmedAdultCount);
                    $('#confirmed-children-count').html(guestJson.ConfirmedChildrenCount);
                    $('#confirmed-infant-count').html(guestJson.ConfirmedInfantCount);
                } else {
                    _showForm();
                }
            } else {
                $('#guest-uninvited').show();
            }
        }
    });
}

function confirm() {
    $('#not-confirmed-guest-msg').html('');
    $adultCount = $('#adult-count');
    $childrenCount = $('#children-count');
    $infantCount = $('#infant-count');

    if ($adultCount.length) guestJson.ConfirmedAdultCount = $adultCount.val();
    if ($childrenCount.length) guestJson.ConfirmedChildrenCount = $childrenCount.val();
    if ($infantCount.length) guestJson.ConfirmedInfantCount = $infantCount.val();
    guestJson.IsConfirmed = true;

    $.ajax({
        url: confirmUrl,
        data: JSON.stringify(guestJson),
        contentType: 'application/json; charset=utf-8',
        type: "POST",
        dataType: 'json',
        success: function (data) {
            if (data.Result == 'Success') {
                $('#guest-form').hide();
                $('#edit-adult-count').html(guestJson.ConfirmedAdultCount);
                $('#edit-children-count').html(guestJson.ConfirmedChildrenCount);
                $('#edit-infant-count').html(guestJson.ConfirmedInfantCount);
                $('#guest-edit').show();
            } else {
                $('#not-confirmed-guest-msg').html('There is some error occured while saving. Please try again.');
            }
        }
    });
}

function edit() {
    _showForm();
    $('#guest-edit').hide();
    $('#guest-confirmed').hide();
}

function _showForm() {
    if (guestJson.AdultCount > 0) {
        _generateGuestCountDropdown($('#adult-count'), guestJson.AdultCount, guest.ConfirmedAdultCount)
        $('#form-adult').show();
    }
    else { $('#form-adult').hide(); }

    if (guestJson.ChildrenCount > 0) {
        _generateGuestCountDropdown($('#children-count'), guestJson.ChildrenCount, guest.ConfirmedChildrenCount)
        $('#form-children').show();
    }
    else { $('#form-children').hide(); }

    if (guestJson.InfantCount > 0) {
        _generateGuestCountDropdown($('#infant-count'), guestJson.InfantCount, guest.ConfirmedInfantCount)
        $('#form-infant').show();
    }
    else { $('#form-infant').hide(); }
}


function _generateGuestCountDropdown($cntrl, optionCount, selected) {
    $cntrl.empty().append('<option value="0">Please Select...</option>');
    for (var i = 0; i <= optionCount; i++) {
        $cntrl.append($('<option>', {
            value: i,
            text: i
        }));
    }
}