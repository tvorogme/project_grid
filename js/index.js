function filter_projects_by_tag(tag) {
    console.log(tag);

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

    // Get all 'cards'

    var project_elements = document.getElementsByClassName("project_box");


    if (tag && tag !== "Сбросить фильтры") {
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

        var filtered_elements = [];


        for (var k = 0; k < project_elements.length; k += 1) {

            if (filter_function(project_elements[k])) {
                filtered_elements.push(project_elements[k]);
            }
        }


        for (var l = 0; l < filtered_elements.length; l += 1) {
            mapped_function(filtered_elements[l], l + 1)
        }

    } else {
        // Last one is hidden text, so skip it
        for (var i = 0; i < project_elements.length; i += 1) {
            mapped_function(project_elements[i], i + 1);
            project_elements[i].style.display = 'block';
        }
    }
}

window.addEventListener('load', function () {
    var project_elements = document.getElementsByClassName("project_box");
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


    for (i = 0; i < project_elements.length; i += 1) {
        get_tags_from_project(project_elements[i]);
    }

    var tag_menu = document.getElementsByClassName("tags-project-box-inside-wrapper")[0];

    for (i = 0; i < tags.length; i += 1) {
        tag_menu.innerHTML += "<p class=\"get_project_with_tag\">" + tags[i] + "</p>";
    }

    document.body.onclick = function (e) {
        e = window.event ? event.srcElement : e.target;
        if (e.className && (e.className.indexOf('project_box_tag') !== -1 || e.className.indexOf('get_project_with_tag') !== -1)) filter_projects_by_tag(e.innerText);
    };
});