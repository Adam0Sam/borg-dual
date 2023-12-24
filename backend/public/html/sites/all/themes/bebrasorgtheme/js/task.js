var task;
var mode = 'visual';
$(function() {
    var codeMirror = CodeMirror.fromTextArea($('#code')[0], {
        lineNumbers: true,
        indentUnit: 4,
        extraKeys: {Tab: function(cm) { cm.replaceSelection("    ", "end"); }}
    });

    var rerun = function() {
        if (mode == 'live')
            run_code();
        else
            run_visuals();
    }

    var run_visuals = function() {
        // Load parameters
        var params = JSON.parse($('input[name=params]').val());
        params.loaded = function() {
            // Load script
            Visual.draw_visuals(task);
        };

        // Initialize task
        task = new Task('#task .canvas', params);
        task.load();
    }

    var run_code = function() {
        console.log('running code');
        var script = codeMirror.getValue();
        // Load parameters
        var params = JSON.parse($('input[name=params]').val());
        params.loaded = function() {
            // Load script
            console.log('drawing visuals');
            Visual.draw_visuals(task, true);
            try {
                var syntax = esprima.parse(script);
                $('script#task-source').remove();
                $('<script id="task-source">' + script + '<\/script>').appendTo('body');
                $('#code-editor .info').hide();
            } catch (e) {
                $('#code-editor .info').text(e).show();
            }
        };

        // Initialize task
        task = new Task('#task .canvas', params);
        task.load();
    };

    rerun();

    // On keyup, start the countdown
    var typing_timer;
    $('#code-editor').keyup(function() {
        clearTimeout(typing_timer);
        if (codeMirror.getValue()) {
            typing_timer = setTimeout(rerun, 700);
        }
    });

    $('.editor .save').click(function() {
        // Update editor contents
        $.each(CKEDITOR.instances, function() {
            this.updateElement();
        });

        // Serialize params
        var that = $(this);
        var form = $(this).closest('form');
        var params = new FormData(form[0]);

        // Append code
        params.append("code", codeMirror.getValue());

        // Append visuals
        if (mode == 'visual')
            Visual.save_visuals();
        params.append("visuals", $('input[name=visuals]').val());

        $.ajax({
            url: form[0].action,
            type: 'POST',
            success: function(data) {
                if (data.success) {
                    var param_set_pk = $('input[name=param_set]').val();
                    that.siblings('.success')
                        .html('Task saved!')
                        .show().delay(2000).fadeOut('slow');
                    // Load parameter forms
                    $('#param-editor').html(data.params_html);
                    $('#new-param-forms').html(data.new_params_html);
                    $('.param-set-form').hide();
                    // Load all parameter set JSON dicts
                    $.each(data.params_json, function(pk, json) {
                        $('.param-set-form-' + pk).find('input[name=params]').val(json);
                    });
                    $('.param-set-form-' + param_set_pk).show();
                    $('#code-editor input[name=params]').val(
                            $('.param-set-form-' + param_set_pk).find('input[name=params]').val());
                    $('#code-editor input[name=visuals]').val(data.visuals_json);
                    rerun();
                    prepare_editors();
                }
            },
            data: params,
            cache: false,
            contentType: false,
            processData: false
        });
        return false;
    });

    $('#task .submit').click(function() {
        var answer = task.getAnswer();
        var param_set_id = $('input[name=param_set]').val();
        var answers = $('.param-set-form-' + param_set_id + ' .answers textarea');
        var correct = false;
        $.each(answers, function() {
            var param_fields = $(this).closest('parameter-fields')
            var answer_prefix = $(this)[0].id.slice(0, -6);
            if ($('#' + answer_prefix + '-type').val() == 'javascript') {
                // If answer is in Javascript, define grader
                eval('var grader = function(answer,minScore,maxScore){'
                     + $(this).val().trim()
                     + '}');
                correct = grader(JSON.parse(answer), 0, 1) == true;
            } else if ($(this).val().trim() == answer.trim()) {
                correct = true;
            }
        });
        if (correct)
            $('#task .correct').show().delay(2000).fadeOut();
        else
            $('#task .incorrect').show().delay(2000).fadeOut();
    });

    $('#task .add-answer').click(function() {
        var answer = task.getAnswer();
        var param_set_id = $('input[name=param_set]').val();
        var url = $('#create-answer-' + param_set_id)[0].action;
        $.post(url, {value: answer, type: 'json'}, function(data){
            if (data.success) {
                $('#param-editor').html(data.params_html);
                prepare_editors();
            }
        });
        return false;
    });

    $('#task .show-answer').click(function() {
        var answer = task.getAnswer();
        alert("Current answer: " + answer);
        return false;
    });

    $(document).on('click', '.toggle-modal', function() {
        $(this.hash).modal('show');
        return false;
    });

    $(document).on('click', '.param-selector', function() {
        var pk = $(this).siblings('input[name=param_set_pk]').val();
        var param_set_form = $('.param-set-form-' + pk);
        $('input[name=param_set]').val(pk);
        $('.param-set-form').hide();
        param_set_form.show();
        $('#code-editor input[name=params]').val(
            param_set_form.find('input[name=params]').val());
        rerun();
    });

    $(document).on('submit', '.new-param', function() {
        var form = $(this);
        $.post(form[0].action, form.serializeArray(), function(data) {
            if (!data.success) {
                form.find('.error').show().html(data.errors);
            } else {
                var param_set_pk = $('input[name=param_set]').val();
                form.modal('hide');
                $('#param-editor').html(data.params_html);
                $('#new-param-forms').html(data.new_params_html);
                $('#code-editor input[name=params]').val(data.params_json);
                $('.param-set-form').hide();
                $('.param-set-form-' + param_set_pk).show();
                $('.param-set-form-' + param_set_pk).find('input[name=params]').val(data.params_json);
                prepare_editors();
                form[0].reset();
            }
        });
        return false;
    });

    $('#create-param-set').submit(function() {
        var form = $(this);
        $.post(form[0].action, form.serializeArray(), function(data) {
            if (!data.success) {
                form.find('.error').show().html(data.errors);
            } else {
                $('input[name=param_set]').val(data.pk);
                $('.editor-tabs .dropdown-menu').html(data.dropdown_html);
                $('#param-editor').html(data.params_html);
                $('#new-param-forms').html(data.new_params_html);
                form.modal('hide');
                if ($('.editor-tabs li.parameters').hasClass('active')) {
                    // Activate the new parameter set
                    $('.param-set-form').hide();
                    $('.param-set-form-' + data.pk).show();
                    $('.param-selector-' + data.pk).parent('li').addClass('active');
                    $('#code-editor input[name=params]').val('');
                }
                prepare_editors();
                rerun();
            }
        });
        return false;
    });

    $(document).on('click', '.param-set-form .remove-param .action', function() {
        var pk = $(this).siblings('input[name=pk]').val();
        var type = $(this).siblings('input[name=type]').val();
        var param_set_pk = $('input[name=param_set]').val();
        var param_fields = $(this).closest('.parameter-fields');
        $.post(this.href, {type: type,
                           pk: pk}, function(data) {
            if (data.success) {
                $('#code-editor input[name=params]').val(data.params_json);
                $('.param-set-form-' + param_set_pk).find('input[name=params]').val(data.params_json);
                param_fields.fadeOut(function() {$(this).remove()});
            }
        });
        return false;
    });

    $(document).on('click', '.param-set-form .remove-set .action', function() {
        if (confirm('Are you sure you want to remove this parameter set?')) {
            var pk = $(this).siblings('input[name=pk]').val();
            $.post(this.href, {pk: pk}, function(data) {
                if (data.success) {
                    $('.editor-tabs .dropdown-menu').html(data.dropdown_html);
                    $('.param-set-form').hide();
                    $('.param-set-form:first').show();
                    $('.param-selector:first').parent('li').addClass('active');
                    $('#code-editor input[name=params]').val(
                            $('.param-set-form:first').find('input[name=params]').val());
                    rerun();
                }
            });
        }
        return false;
    });

    $('.remove-task').click(function() {
        if (confirm('Are you sure you want to delete this task?')) {
            $.post(this.href, function() {
                window.location.replace('/');
            });
        }
        return false;
    });

    $('#visual-components .visual-component').draggable({
        revert: true,
        revertDuration: 0
    });
    $('#task').droppable({
        tolerance: 'fit',
        hoverClass: 'active',
        drop: function(e, ui) {
            var droppable_pos = $('#task').offset();
            var visual = Visual.new_visual(task, ui.draggable.attr('data-type'), {
                x: ui.offset.left - droppable_pos.left - 1,
                y: ui.offset.top - droppable_pos.top - 1,
                width: ui.draggable.outerWidth() - 2,
                height: ui.draggable.outerHeight() - 2,
            });
            if (Visual.dragresize.element) {
                Visual.dragresize.deselect(true);
            }
            Visual.dragresize.select(visual.box[0]);
            Visual.save_visuals();
            ui.draggable.draggable('option', 'revert', true);
        }
    });

    $('body').keyup(function(e) {
        if (e.keyCode == 46 && $('.component-box.active').length) {
            // Delete key pressed
            var target = e.target.tagName.toLowerCase();
            if (target != 'input' && target != 'textarea') {
                var box = $('.component-box.active');
                Visual.delete_visual(box.attr('id'));
                Visual.save_visuals();
                box.remove();
                rerun();
            }
        }
    });

    $('.editor-tabs li a').click(function() {
        var li = $(this).closest('li');
        var old_mode = mode;
        if ($(this).hasClass('dropdown-toggle'))
            return;
        if (li.hasClass('visual')) {
            mode = 'visual';
            $('#task .buttons').hide();
        } else if ($(this).attr('data-toggle') == 'tab') {
            mode = 'live';
            $('#task .buttons').show();
        }
        if (old_mode == 'visual' && mode != old_mode) {
            // Temporary save visuals when switching away from visual mode
            Visual.save_visuals();
        }
        if (!$(this).hasClass('param-selector') && old_mode != mode)
            rerun();
    });

    $('li.code').on('shown', function() {
        codeMirror.refresh();
    });

    function prepare_editors() {
        $('.parameter-fields.parameters textarea').each(function() {
            try {
                var editor = CKEDITOR.replace(this, {
                    entities: false,
                    toolbar: [
                        ['Bold', 'Italic', 'Underline', '-', 'RemoveFormat'],
                        ['NumberedList', 'BulletedList'],
                        ['Table', 'HorizontalRule', 'SpecialChar'],
                        ['Source']
                    ]
                });
                editor.on('blur', function(e) {
                    editor.updateElement();
                });
            } catch(e) {}
        });
    }

    prepare_editors();
});
