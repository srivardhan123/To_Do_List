//it executes each time the page reloads...
window.addEventListener('load', () => {
	const form = document.querySelector(".newtask");
	const input = document.querySelector("#newtaskinput");
	// const list_el = document.querySelector("#tasks");

    //extracting all the tasks from the local storage to display when it loads..if there is no task at all it becomes empty..
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    //when we submit the add new task form, then this function executes...
	form.addEventListener('submit', (e) => {
		e.preventDefault();
        //storing the input value of newly added task into it...
		const task = input.value;
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        e.target.reset();
        DisplayFunction();
	});
    DisplayFunction();
});


function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function DisplayFunction()
{
    
	const list_el = document.querySelector("#tasks");
    //remove intial childrens each time when it submit form because..already it has tasks which was added earlier in list_el parent element..
    //So, if we do not remove child elements before itself it shows same task again....because those task are already present in tasks array..
    removeAllChildNodes(list_el);

    tasks.forEach(task => {
        //creating html div elements from javascript...
		const task_el = document.createElement('div');
		task_el.classList.add('task');

		const task_content_el = document.createElement('div');
		task_content_el.classList.add('content');

        //adding content div element into task list div element...
		task_el.appendChild(task_content_el);

        //creating a input text with read only feature to show the tasks...
		const task_input_el = document.createElement('input');
		task_input_el.classList.add('text');
		task_input_el.type = 'text';
		task_input_el.value = task;
		task_input_el.setAttribute('readonly', 'readonly');

        //adding this feature inside the content div element..
		task_content_el.appendChild(task_input_el);

        //similarly adding actions class which contain both edit and delete option of feature...
		const task_actions_el = document.createElement('div');
		task_actions_el.classList.add('actions');
		
        //edit feature..
		const task_edit_el = document.createElement('button');
		task_edit_el.classList.add('edit');
		task_edit_el.innerText = 'Edit';

        //delete featrue...
		const task_delete_el = document.createElement('button');
		task_delete_el.classList.add('delete');
		task_delete_el.innerText = 'Delete';
        
        //adding edit,delete in the actions class...
		task_actions_el.appendChild(task_edit_el);
		task_actions_el.appendChild(task_delete_el);

        //adding actions into a task list...
		task_el.appendChild(task_actions_el);
    
        //adding each task into a overall task...
		list_el.appendChild(task_el);

        //while clicking edit button,then this below functionality must executes...
		task_edit_el.addEventListener('click', (e) => {
			if (task_edit_el.innerText.toLowerCase() == "edit") {
				task_edit_el.innerText = "Save";
				task_input_el.removeAttribute("readonly");
				task_input_el.focus();
			} else {
				task_edit_el.innerText = "Edit";
                //updating the tasks array after updating the task, and again reseting it into local storage with updated data..
                tasks[tasks.findIndex(item => item===task)] = task_input_el.value;
                localStorage.setItem('tasks',JSON.stringify(tasks));
 				task_input_el.setAttribute("readonly", "readonly");
			}
		});

        //while clicking the delete button below functionality executes...
		task_delete_el.addEventListener('click', (e) => {
			list_el.removeChild(task_el);
            //deleting the task from the tasks array after clicking the delete array...and reseting the local storage data.
            tasks = tasks.filter(t => t!=task);
            localStorage.setItem('tasks',JSON.stringify(tasks));
		});
    });
}