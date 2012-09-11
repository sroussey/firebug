function runTest()
{
    FBTest.sysout("issue4543.START");
    FBTest.openNewTab(basePath + "css/4543/issue4543.html", function(win)
    {
        FBTest.openFirebug();
        FBTest.selectPanel("html");

        FBTest.selectElementInHtmlPanel("element1", function(node)
        {
            var panel = FBTest.selectSidePanel("css");
            var value = panel.panelNode.querySelector(".cssPropValue");
            var getElement = function() { return win.document.getElementById("element1"); };
            // Click the CSS value to open the inline editor
            FBTest.synthesizeMouse(value);
  
            var editor = panel.panelNode.querySelector(".textEditorInner");
            if (FBTest.ok(editor, "editor must be available now"))
            {
                // Move text cursor between 'g' and 'b' of 'pngbase64'
                FBTest.sendKey("HOME", editor);
                for (var i=0; i<19; i++)
                    FBTest.sendKey("RIGHT", editor);
  
                // Enter a semicolon
                FBTest.sendChar(";", editor);
                FBTest.compare(/png;base64/, editor.value, "Semicolon must be entered");
            }

            FBTest.testDone("issue4543.DONE");
        });

        // xxxsz: Needs to be executed after the first test
        /*
        var imgURL = basePath + "css/4543/issue4543.png";
        FBTest.loadImageData(imgURL, function(expectedImage)
        {
            var actualImage = FBTest.getImageDataFromNode(win.document.getElementById("element1"));
            FBTest.compare(expectedImage, actualImage, "The screen must be in expected state");
        });
        */
    });
}
