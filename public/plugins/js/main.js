/* 'use strict'

$(document).ready(function () {
    $('#alert-form').on('submit', function (e) {
        e.preventDefault();
        var form = $(this);
        var data = {
            description: form.find('#description').val(),
            title: form.find('input#title').val(),
            start_date: form.find('input#startDate').val(),
            end_date: form.find('input#endDate').val(),
            closure_message: form.find('#closureMessage').val(),
            status: form.find('input#status')[0].checked,
            notify: form.find('input#notify')[0].checked
        }

        $.ajax({
            url: "/alerts/new",
            method: "POST",
            success: function (err, res) {
                window.location = '/alerts'
                console.log(res);
            },
            error: function (err, res) {
                alert("The alert wasn't created");
                console.log(res);
            },
            data: data
        });
    });
});

$(document).ready(function () {
    $('#edit-alert-form').on('submit', function (e) {
        e.preventDefault();
        var form = $(this);
        var data = {
            description: form.find('#description').val(),
            title: form.find('input#title').val(),
            start_date: form.find('input#startDate').val(),
            end_date: form.find('input#endDate').val(),
            closure_message: form.find('#closureMessage').val(),
            status: form.find('input#status')[0].checked,
            notify: form.find('input#notify')[0].checked,
            id: form.find('input#id_alert').val()
        }
        console.log(data)
        $.ajax({
            url: "/alerts/edit/:alert_id",
            method: "POST",
            success: function (res, err) {
                window.location = '/alerts'
                console.log(res);
            },
            error: function (res, err) {
                alert("The alert wasn't updated");
                console.log(res);
            },
            data: data
        });
    });
});

$(document).ready(function () {
    $('#general-issues-form').on('submit', function (e) {
        e.preventDefault();
        var form = $(this);
        var data = {
            id: form.find('input#id').val(),
            title: form.find('input#title').val(),
            description: form.find('#description').val(),
            start_date: form.find('input#startDate').val(),
            service: form.find('input#service').val(),
            team: form.find('input#team').val(),
            opened_by: form.find('input#opened_by').val(),
            status: form.find('input#status')[0].checked,
            visibility: form.find('input#visibility')[0].checked,
            me_too: 0,
            notify: form.find('input#notify')[0].checked
        }
        console.log(data)
        if(data.notify == true && data.visibility == false) {
            alert("A general issue can't be notified and private");
        }else{
            $.ajax({
                url: "/general_issues/new",
                method: "POST",
                success: function (res, err) {
                    window.location = '/general_issues'
                    console.log(res);
                },
                error: function (res, err) {
                    alert("The general issue wasn't created");
                    console.log(res);
                },
                data: data
            });
        }
    });
});

$(document).ready(function () {
    $('#edit-general-issues-form').on('submit', function (e) {
        e.preventDefault();
        
        var form = $(this);
        var data = {
            id: form.find('input#id').val(),
            title: form.find('input#title').val(),
            description: form.find('#description').val(),
            start_date: form.find('input#startDate').val(),
            service: form.find('input#service').val(),
            team: form.find('input#team').val(),
            opened_by: form.find('input#opened_by').val(),
            status: form.find('input#status')[0].checked,
            visibility: form.find('input#visibility')[0].checked,
            id: form.find('input#id_general_issue').val(),
            notify: form.find('input#notify')[0].checked
        }
        console.log(data)
        if(data.notify == true && data.visibility == false) {
            alert("A general issue can't be notified while beeing private");
        } else {
            $.ajax({
                url: "/general_issues/edit/:general_issue_id",
                method: "POST",
                success: function (res, err) {
                    window.location = '/general_issues'
                    console.log(res);
                },
                error: function (res, err) {
                    alert("The general issue wasn't updated");
                    console.log(res);
                },
                data: data
            });
        }
    });
});

//Delete general issue
$(document).ready(function () {
    var delete_button = document.getElementById('delete_general_issue');
    delete_button.addEventListener('click', function() {
        var data = {
            general_issue_id: delete_button.value
        };
        if(confirm("Do you want to delete this general issue?")) {
            $.ajax({
                url: "/general_issues/delete/:general_issue_id",
                method: "POST",
                success: function (res, err) {
                    window.location = '/general_issues'
                    console.log(res);
                },
                error: function (res, err) {
                    alert("The general issue wasn't deleted");
                    console.log(res);
                },
                data: data
            });
        }
    }, false);
})

//Delete alert
$(document).ready(function () {
    var delete_button = document.getElementById('delete_alert');
    delete_button.addEventListener('click', function() {
        var data = {
            alert_id: delete_button.value
        };
        if(confirm("Do you want to delete this alert?")) {
            $.ajax({
                url: "/alerts/delete/:alert_id",
                method: "POST",
                success: function (res, err) {
                    window.location = '/alerts'
                    console.log(res);
                },
                error: function (res, err) {
                    alert("The alert wasn't deleted");
                    console.log(res);
                },
                data: data
            });
        }
    }, false);
})

$(document).ready(function () {
    $('#alerts-data-table').DataTable();
});
$(document).ready(function () {
    $('#general-incidents-data-table').DataTable();
});
$(document).ready(function () {
    $('#feedbacks-data-table').DataTable();
});

*/