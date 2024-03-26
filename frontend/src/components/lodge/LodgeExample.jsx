import React, { useEffect, useRef } from 'react';
import $ from 'jquery';

export default function LodgeExample(taskId = 35) {

	const baseURL = 'https://bebras.org';
	const corsProxy = 'https://cors-anywhere.herokuapp.com/';

	const constructUrl = (url) => {
		return `${corsProxy}${baseURL}${url}`;
	
	}

	const innerHtml = `
	<div class="content">
    <div id="node-58" class="node node-page clearfix" about="/?q=lodge1" typeof="foaf:Document">

  
      <span property="dc:title" content="Bebras Lodge example 1" class="rdf-meta element-hidden"></span><span property="sioc:num_replies" content="0" datatype="xsd:integer" class="rdf-meta element-hidden"></span>
  
  <div class="content">
    <div class="field field-name-body field-type-text-with-summary field-label-hidden"><div class="field-items"><div class="field-item even" property="content:encoded">Bebras Lodge generated task json file: <a href="sites/all/themes/bebrasorgtheme/downloads/35.json">35.json</a>
<br />

<style type="text/css">
   .componental-task p {margin-top: 0; margin-left: 10px}
   .componental-task div {margin: 0}   
</style>
	<script type="text/javascript">
	console.log('loading task');
        var $hbn = jQuery.noConflict();

		var id = 35;
		var global_task = null;
		var global_grader = null;
		var global_data = null;
		var taskid = null;
		(function($) { 					
			$.when(
				$.getScript("https://bebras.org/sites/all/themes/bebrasorgtheme/js/raphael.min.js"),
				$.ajax({
					url: "https://bebras.org/sites/all/themes/bebrasorgtheme/js/componental.js",
					success: function(data) {
						eval(data);
					}
				}),
   				$.getJSON("https://bebras.org/sites/all/themes/bebrasorgtheme/downloads/'+id+'.json", function(data) {
						taskid = data.id;
						global_data = data;
					}
				,'json')
			).then( function(){
					for (var property in global_data.task) {
							console.log('cycling');
							if (global_data.task.hasOwnProperty(property)) {
									var element = global_data.task[property];
									if (element.type == 'html') {
										$('#task-container').append(element.content);
										console.log('element appended')
									} else {
										if (element.type == 'javascript') {
											eval(element.content);
										}
										if(element.content.indexOf('var grader=')==0) {
											global_grader = grader;
										}
									}	
							}
					}
					task.load();

					$('#b1').click(function () {  // Tikrinti
						answ = task.getAnswer();
						var answerchecked = null;
						if (global_grader) {
							answerchecked = global_grader.gradeTask(task.getAnswer(), 0, 1);
						} else {
							answerchecked = global_data.acceptedAnswers.indexOf(answ) != -1 ? 1 : 0;
						}
						if (answerchecked != null) {
							if (answerchecked == 1)
								$('#correct').show().delay(2000).fadeOut();
							else
								$('#incorrect').show().delay(2000).fadeOut();
						}
						return true;

					});

					$('#b3').click(function () {  // Pradėti iš naujo
						task.unload();
						task = new Task('#task-container', task.params);
						task.load();
					});
			});
		})( $hbn );                	
	</script>
	<br />
	<div id="task-container" style="position: relative;"></div>
	<div id="answ_container" style="position: relative; height: 25px; width: 100%;">
		<div id="correct" style="display: none; position: absolute; text-align: center; vertical-align: middle; line-height: 25px; width: 100%; height: 100%; background: #DFF0D8;">
			Correct!</div>
		<div id="incorrect" style="display: none; position: absolute; text-align: center; vertical-align: middle; line-height: 25px; width: 100%; height: 100%; background: #F2DEDE; z-index: 10;">
			Incorrect!</div>
	</div>
	<button style="margin: 10px;" id='b1' name='b1' type='button'>Check answer</button>
	<button style="margin: 10px;" id='b3' name='b3' type='button'>Restart</button>
</div></div></div>  </div>

  
  </div>
	`

	const contentRef = useRef(null);

	// useEffect(() => {
	// 	console.log('loading task');

	// 	const id = 35;
	// 	const global_task = null;
	// 	let global_grader = null;
	// 	let global_data = null;
	// 	let taskid = null;
	// 	let grader;

	// 	const loadTask = async () => {
	// 		if (!contentRef.current) return;
	// 		const raphaelScriptUrl = constructUrl('/sites/all/themes/bebrasorgtheme/js/raphael.min.js');
	// 		const componentalScriptUrl = constructUrl('/sites/all/themes/bebrasorgtheme/js/componental.js');
	// 		const jsonDataUrl = constructUrl(`/sites/all/themes/bebrasorgtheme/downloads/${id}.json`);

	// 		try {
	// 			// Load scripts and JSON data concurrently
	// 			const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

	// 			const [raphaelScript, componentalScript, jsonData] = await Promise.all([
	// 				fetch(proxyUrl + raphaelScriptUrl).then(response => response.text()),
	// 				fetch(proxyUrl + componentalScriptUrl).then(response => response.text()),
	// 				fetch(proxyUrl + jsonDataUrl).then(response => response.json())
	// 			]);


	// 			// Evaluate the scripts
	// 			eval(raphaelScript);
	// 			eval(componentalScript);

	// 			// Process JSON data
	// 			for (const property in jsonData.task) {
	// 				console.log('cycling')
	// 				if (jsonData.task.hasOwnProperty(property)) {
	// 					const element = jsonData.task[property];
	// 					if (element.type === 'html') {
	// 						contentRef.current.getElementById('task-container').innerHTML += element.content;
	// 					} else {
	// 						eval(element.content);
	// 					}
	// 					if (element.content.indexOf('var grader=') === 0) {
	// 						global_grader = grader;
	// 					}
	// 				}
	// 			}

	// 			// Additional script logic...
	// 		} catch (error) {
	// 			console.error('Error loading task:', error);
	// 		}
	// 	};

	// 	loadTask();
	// }, [contentRef]); // Empty dependency array ensures the effect runs only once when the component mounts


	useEffect(() => {
		if(!contentRef.current) return;
		console.log('loading task');
		var $hbn = $.noConflict();

		var id = 35;
		var global_task = null;
		var global_grader = null;
		var global_data = null;
		var taskid = null;
		let grader;
		let task;
		let Task;
		let answ;

		(function ($) {
			$.when(
				$.getScript(`${constructUrl("/sites/all/themes/bebrasorgtheme/js/raphael.min.js")}`),
				$.ajax({
					url: `${constructUrl("/sites/all/themes/bebrasorgtheme/js/componental.js")}`,
					success: function (data) {
						eval(data);
					}
				}),
				$.getJSON('${constructUrl("/sites/all/themes/bebrasorgtheme/downloads/' + id + '.json")}', function (data) {
					taskid = data.id;
					global_data = data;
				}),
			).then(function () {
				for (var property in global_data.task) {
					console.log('cycling');
					if (global_data.task.hasOwnProperty(property)) {
						var element = global_data.task[property];
						if (element.type == 'html') {
							$('#task-container').append(element.content);
							console.log('element appended')
						} else {
							if (element.type == 'javascript') {
								eval(element.content);
							}
							if (element.content.indexOf('var grader=') == 0) {
								global_grader = grader;
							}
						}
					}
				}
				task.load();

				$('#b1').click(function () {  // Tikrinti
					answ = task.getAnswer();
					var answerchecked = null;
					if (global_grader) {
						answerchecked = global_grader.gradeTask(task.getAnswer(), 0, 1);
					} else {
						answerchecked = global_data.acceptedAnswers.indexOf(answ) != -1 ? 1 : 0;
					}
					if (answerchecked != null) {
						if (answerchecked == 1)
							$('#correct').show().delay(2000).fadeOut();
						else
							$('#incorrect').show().delay(2000).fadeOut();
					}
					return true;
				});

				$('#b3').click(function () {  // Pradėti iš naujo
					task.unload();
					task = new Task('#task-container', task.params);
					task.load();
				});
			});
		})($hbn);
	}, [contentRef]);

	return (
		<div ref={contentRef} className="content" dangerouslySetInnerHTML={{ __html: innerHtml }}>
		</div>
	)
}
