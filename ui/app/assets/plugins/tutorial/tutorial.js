define([
  "main/plugins",
  "services/tutorial",
  "text!./tutorial.html",
  "widgets/layout/layout",
  "css!./tutorial",
  "css!widgets/menu/menu",
  "css!widgets/modules/modules",
  "css!widgets/intro/intro"
], function(
  plugins,
  TutorialState,
  tpl,
  layout
){

  return {

    render: function(url) {
      layout.renderPlugin(bindhtml(tpl, TutorialState))
    },

    route: function(url, breadcrumb) {
      breadcrumb([['tutorial/', "Tutorial"]]);
      if (TutorialState.hasTutorial()){
        if (url.parameters[0] === undefined || url.parameters[0] === "") {
          TutorialState.page(null);
          TutorialState.index(null);
        } else {
          var id = parseFloat(url.parameters[0]);
          var p = TutorialState.pages()[id];
          TutorialState.page(p);
          TutorialState.index(id);
          breadcrumb([['tutorial/', "Tutorial"], ["tutorial/"+id, p.title]]);
        }
      }
    },

    keyboard: function(key) {
      if (key == "TOP") {
        TutorialState.gotoPrevPage();
      } else if (key == "BOTTOM") {
        TutorialState.gotoNextPage();
      }
    }

  }
});
