var tags = [];

function filter_projects_by_tag(tag, projects) {
    if (tag) {
        function filter_function(element) {
            // Get all 'span' in element
            var element_tags = element.getElementsByTagName("span");

            for (var i = 0; i < element_tags.length; i += 1) {

                if (element_tags[i].innerText === tag) {
                    element.style.display = 'block';
                    return true
                }
            }

            element.style.display = 'none';
            return false

        }

        return projects.filter(filter_function)
    } else {
        function display_project_blok(element, index) {
            element.style.display = 'block';
        }

        projects.map(display_project_blok);
        return projects
    }
}

function colorize_tags() {
    var tags_menu = Array.from(document.getElementsByClassName("get_project_with_tag"));

    if (tags.length > 0) {
        tags_menu.map(function (value) {
            if (tags.indexOf(value.innerText) !== -1) {
                value.style.color = "#49B398"
            }
        })
    } else {
        tags_menu.map(function (value) {
            value.style.color = '#613D8D'
        })
    }

}

function filter_by_tags(new_tag) {
    var projects = Array.from(document.getElementsByClassName("project_box"));

    // First box - add button
    projects.splice(0, 1);

    if (new_tag === "Сбросить фильтры") {
        filter_projects_by_tag(null, projects);
        tags = [];
        colorize_tags();
        return true
    }


    if (tags.indexOf(new_tag) === -1) {
        tags.push(new_tag);
        colorize_tags();
    }

    var project_elements = filter_projects_by_tag(tags[0], projects);


    for (var i = 1; i < tags.length; i += 1) {
        project_elements = filter_projects_by_tag(tags[i], project_elements);
    }

    const right_box = document.getElementsByClassName("right-flex-project-box")[0];
    const left_box = document.getElementsByClassName("left-flex-project-box")[0];


    function mapped_function(value, index) {
        if (index % 2 === 0) {
            // Append to right
            right_box.appendChild(value);

        } else {
            // Append to left
            left_box.appendChild(value);
        }
    }

    project_elements.map(mapped_function);

}

window.addEventListener('load', function () {
    var project_elements = Array.from(document.getElementsByClassName("project_box"));

    // First box - add button
    project_elements.splice(0, 1);

    var tags = [];
    var blacklist_tags = [];
    var blacklist_tags_blocks = document.getElementsByClassName("get_project_with_tag");

    for (var i = 0; i < blacklist_tags_blocks.length; i += 1) {
        blacklist_tags.push(blacklist_tags_blocks[i].innerText)
    }

    function get_tags_from_project(element) {
        var element_tags = element.getElementsByTagName("span");

        // Last one is hidden text, so skip it
        for (var i = 0; i < element_tags.length; i += 1) {
            if (tags.indexOf(element_tags[i].innerText) === -1 &&
                blacklist_tags.indexOf(element_tags[i].innerText) === -1) {
                tags.push(element_tags[i].innerText);
            }
        }
    }

    project_elements.map(get_tags_from_project);

    var tag_menu = document.getElementsByClassName("tags-project-box-inside-wrapper")[0];

    for (i = 0; i < tags.length; i += 1) {
        tag_menu.innerHTML += "<p class=\"get_project_with_tag\">" + tags[i] + "</p>";
    }

    document.body.onclick = function (e) {
        e = window.event ? event.srcElement : e.target;
        if (e.className && (e.className.indexOf('project_box_tag') !== -1 || e.className.indexOf('get_project_with_tag') !== -1)) filter_by_tags(e.innerText);
    };
});