var guestJson = null;

function login() {
    $mobileNo = $('#mobile-no');
    guestJson = { "PhoneId": $mobileNo.val() };
    $.ajax({
        url: loginUrl,
        data: JSON.stringify(guestJson),
        contentType: 'application/json; charset=utf-8',
        type: "POST",
        dataType: 'json',
        success: function (data) {
            if (data.Result == 'Success') {
                guestJson = JSON.parse(data.JsonGuest);
                if (guestJson.IsConfirmed) {
                    $('#guest-login').hide();
                    $('#guest-confirmed').show();
                    _displayConfirmedGuestCount('confirmed');
                } else {
                    $('#guest-login').hide();
                    _showForm();

                }
            } else {
                $('#guest-login').hide();
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
                _displayConfirmedGuestCount('edit')
                $('#guest-edit').show();
            } else {
                $('#not-confirmed-guest-msg').html('There is some error occured while saving. Please try again.');
            }
        }
    });
}

function showLogin() {
    $('#guest-login').show();
    $('#guest-uninvited').hide();
}
function edit() {
    _showForm();
    $('#guest-edit').hide();
    $('#guest-confirmed').hide();
}

function _showForm() {
    if (guestJson.AdultCount > 0) {
        _generateGuestCountDropdown($('#adult-count'), guestJson.AdultCount, guestJson.ConfirmedAdultCount)
        $('#form-adult').show();
    }
    else { $('#form-adult').hide(); }

    if (guestJson.ChildrenCount > 0) {
        _generateGuestCountDropdown($('#children-count'), guestJson.ChildrenCount, guestJson.ConfirmedChildrenCount)
        $('#form-children').show();
    }
    else { $('#form-children').hide(); }

    if (guestJson.InfantCount > 0) {
        _generateGuestCountDropdown($('#infant-count'), guestJson.InfantCount, guestJson.ConfirmedInfantCount)
        $('#form-infant').show();
    }
    else { $('#form-infant').hide(); }
    $('#guest-form').show();
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

function _displayConfirmedGuestCount(prefix) {
    $adultCount = $('#' + prefix + '-adult-count');
    if (guestJson.AdultCount > 0) {
        $adultCount.html(guestJson.ConfirmedAdultCount);
        $adultCount.parent().show();
    } else {
        $adultCount.parent().hide();
    }

    $childrenCount = $('#' + prefix + '-children-count');
    if (guestJson.ChildrenCount > 0) {
        $childrenCount.html(guestJson.ConfirmedChildrenCount);
        $childrenCount.parent().show();
    } else {
        $childrenCount.parent().hide();
    }

    $infantCount = $('#' + prefix + '-infant-count');
    if (guestJson.InfantCount > 0) {
        $infantCount.html(guestJson.ConfirmedInfantCount);
        $infantCount.parent().show();
    } else {
        $infantCount.parent().hide();
    }
}