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
            alert('correct!');
        else
            $('#task .incorrect').show().delay(2000).fadeOut();
            alert('incorrect!');
    });