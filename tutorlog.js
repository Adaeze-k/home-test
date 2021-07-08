$(document).ready(function(){

    var current_fs, next_fs, previous_fs; //fieldsets
    var opacity;
    var current = 1;
    var steps = $("fieldset").length;
    
    setProgressBar(current);
    
    $(".next").click(function(){
    
    current_fs = $(this).parent();
    next_fs = $(this).parent().next();
    
    //Add Class Active
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
    
    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
    step: function(now) {
    // for making fielset appear animation
    opacity = 1 - now;
    
    current_fs.css({
    'display': 'none',
    'position': 'relative'
    });
    next_fs.css({'opacity': opacity});
    },
    duration: 500
    });
    setProgressBar(++current);
    });
    
    $(".previous").click(function(){
    
    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();
    
    //Remove class active
    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
    
    //show the previous fieldset
    previous_fs.show();
    
    //hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
    step: function(now) {
    // for making fielset appear animation
    opacity = 1 - now;
    
    current_fs.css({
    'display': 'none',
    'position': 'relative'
    });
    previous_fs.css({'opacity': opacity});
    },
    duration: 500
    });
    setProgressBar(--current);
    });
    
    function setProgressBar(curStep){
    var percent = parseFloat(100 / steps) * curStep;
    percent = percent.toFixed();
    $(".progress-bar")
    .css("width",percent+"%")
    }
    
    $(".submit").click(function(){
    return false;
    })
    
    });

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#imagePreview').css('background-image', 'url('+e.target.result +')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function() {
        readURL(this);
    });   


    $(document).ready(function () {
        $(".activation-code-input").activationCodeInput({
          number: 6
        });
      });
      
      function inputFilter(e) {
        var key = e.keyCode || e.which;
      
        if (
          (!e.shiftKey && !e.altKey && !e.ctrlKey && key >= 48 && key <= 57) ||
          (key >= 96 && key <= 105) ||
          key == 8 ||
          key == 9 ||
          key == 13 ||
          key == 37 ||
          key == 39
        ) {
        } else {
          return false;
        }
      }
      
      jQuery.fn.activationCodeInput = function (options) {
        var defaults = {
          number: 4,
          length: 1
        };
        var settings = $.extend({}, defaults, options);
        // $('#log').append('options = ' + JSON.stringify(options));
        // $('#log1').append('defaults = ' + JSON.stringify(defaults));
        // $('#log2').append('settings = ' + JSON.stringify(settings));
      
        return this.each(function () {
          var self = $(this);
          var activationCode = $("<div />").addClass("activation-code");
          var placeHolder = self.attr("placeholder");
          // alert(placeHolder);
          activationCode.append($("<span />").text(placeHolder));
          self.replaceWith(activationCode);
          activationCode.append(self);
      
          var activationCodeInputs = $("<div />").addClass("activation-code-inputs");
      
          for (var i = 1; i <= settings.number; i++) {
            activationCodeInputs.append(
              $("<input />").attr({
                maxLength: settings.length,
                onkeydown: "return inputFilter(event)",
                oncopy: "return false",
                onpaste: "return false",
                oncut: "return false",
                ondrag: "return false",
                ondrop: "return false"
              })
            );
          }
      
          activationCode.prepend(activationCodeInputs);
      
          activationCode.on("click touchstart", function (event) {
            // console.log(event);
            // console.log(event.type);
            if (!activationCode.hasClass("active")) {
              activationCode.addClass("active");
              setTimeout(function () {
                activationCode
                  .find(".activation-code-inputs input:first-child")
                  .focus();
              }, 200);
            }
          });
      
          activationCode
            .find(".activation-code-inputs")
            .on("keyup input", "input", function (event) {
              // $(this).css('background','red');
              if (
                $(this).val().toString().length == settings.length ||
                event.keyCode == 39
              ) {
                $(this).next().focus();
                if ($(this).val().toString().length) {
                  $(this).css("border-color", "#46b2f0");
                }
              }
              if (event.keyCode == 8 || event.keyCode == 37) {
                $(this).prev().focus();
                if (!$(this).val().toString().length) {
                  $(this).css("border-color", "#ccc");
                }
              }
              var value = "";
              activationCode.find(".activation-code-inputs input").each(function () {
                // value = value + $(this).val().toString();
                value += $(this).val().toString();
              });
              self.attr({
                value: value
              });
            });
      
          $(document).on("click touchstart", function (e) {
            console.log(e.target);
            console.log($(e.target).parent());
            console.log($(e.target).parent().parent());
            // false true = false
            // true false = false
            // false false = false
            //true true = true
            if (
              !$(e.target).parent().is(activationCode) &&
              !$(e.target).is(activationCode) &&
              !$(e.target).parent().parent().is(activationCode)
            ) {
              var hide = true;
      
              activationCode.find(".activation-code-inputs input").each(function () {
                if ($(this).val().toString().length) {
                  hide = false;
                }
              });
              if (hide) {
                activationCode.removeClass("active");
              } else {
                activationCode.addClass("active");
              }
            }
          });
        });
      };
      