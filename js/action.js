//plugin start
(function($) {
	$.fn.Addwords = function(data) {
        //for extra detection of errors
        "use strict";

        //customizable input area
        if(data.divColour){
            var rectangle = $("<div class='wordRectangle'><ul></ul></div>")
                .css("background-color",data.divColour)
                .css("border",data.border)
        }

        return this.each(function() {
            //prevent messy html tags with variables
            var words = "<li id='words'><span>",
                wordsInput = "<li id='words'><span>",
                deleting = "</span><a class='delete' href='#'>x</a></li>",
                inputText = "<li class='tags-input'><input type='text' placeholder='Enter tag..' class='tags-secret'></li>",
                //finding ul tags in html
				ul = rectangle.find("ul"),
                box = $(this).after(rectangle),
                //value of input
                tags = box.val(),
                //splitting tags into an array
                wordRows = tags.split(",");

			// add tags to start
			wordRows.forEach(function(tag) {
				if(tag) {
					ul.append(words+tag+deleting);
				}
			});

			// add input
			ul.append(inputText);
			// add the old element
            rectangle.append(box);
			// size the text
			var input = ul.find("input");

            // delete a word by clicking on x
            rectangle.on("click","li#words",function(e) {
                e.preventDefault();
                $(this).closest("li").remove();
            });
            // while typing
            rectangle.on("keyup","li input",function(i) {
				i.preventDefault();
				ul = rectangle.find("ul");
				var next = input.next(),
					inputLi = ul.find("li.tags-input");

				//allowing to type multiple letters in one block
				if(!!~[9,188,13].indexOf(i.keyCode)) {
					var val = input.val();
					var bool = true;

                    //customizable maximum number of words after activated
					if(data.maxWords) {
                        //check input length and compare to custom entered length
						if(box.val().split(",").length == data.maxWords) {
							bool = false;
							input.val("");
							next.val("");
						}
					}
                    // add the word
					if(val && bool) {
						// place new block with entered word in it
                        // delete button included
						inputLi.before(wordsInput+val+deleting);
						// clearing entered values
						input.val("");
					}
                }
			});
		});
	}
})(jQuery);