import { Directive } from '@angular/core';

@Directive({
  selector: '[appConvertFileToBase64]'
})
export class ConvertFileToBase64Directive {

 public constructor() {
  }
  function() {
    return {
      scope: {
        fileread: "="
      },
      link: function (scope, element, attributes) {
        element.bind("change", function (changeEvent) {
          var reader = new FileReader();
          reader.onload = function (loadEvent) {
            scope.$apply(function () {
              scope.fileread = loadEvent.target;//.result;
            });
          }
          reader.readAsDataURL(changeEvent.target.files[0]);
        });
      }
    }
  };
}
