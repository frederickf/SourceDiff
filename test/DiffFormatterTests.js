module('lining up text');

test("add empty line for delete", function() {
    var text1 = 'delete\ncommon';
    var text2 = 'common';

    var diff = new SourceDiff.Diff(false);
    var result = diff.diff(text1, text2);

    var formatter = new SourceDiff.DiffFormatter(diff);

    var lines = formatter.lineUpText(text1, text2, result);

    assertEquals(2, lines[0].length);
    assertEquals(2, lines[1].length);
    assertEquals(' ', lines[1][0]);
    assertEquals('common', lines[1][1]);
});

test("add and a delete on the same line does not add extra line", function() {
    var text1 = 'delete\ncommon';
    var text2 = 'insert\ncommon';

    var diff = new SourceDiff.Diff(false);
    var result = diff.diff(text1, text2);

    var formatter = new SourceDiff.DiffFormatter(diff);

    var lines = formatter.lineUpText(text1, text2, result);

    assertEquals(2, lines[0].length);
    assertEquals(2, lines[1].length);
});

test("insert adds an extra line to the left", function() {
    var text1 = 'common';
    var text2 = 'insert\ncommon';

    var diff = new SourceDiff.Diff(false);
    var result = diff.diff(text1, text2);

    var formatter = new SourceDiff.DiffFormatter(diff);

    var lines = formatter.lineUpText(text1, text2, result);

    assertEquals(2, lines[0].length);
    assertEquals(2, lines[1].length);
    assertEquals(' ', lines[0][0]);
    assertEquals('common', lines[0][1]);
});

test("one delete, two inserts, adds line to left", function() {
    var text1 = 'delete\ncommon';
    var text2 = 'insert1\ninsert2\ncommon';

    var diff = new SourceDiff.Diff(false);
    var result = diff.diff(text1, text2);

    var formatter = new SourceDiff.DiffFormatter(diff);

    var lines = formatter.lineUpText(text1, text2, result);

    assertEquals(3, lines[0].length);
    assertEquals(3, lines[1].length);
    assertEquals('delete', lines[0][0]);
    assertEquals(' ', lines[0][1]);
    assertEquals('common', lines[0][2]);
});

test("three deletes, one insert, adds two lines to right", function() {
    var text1 = 'delete1\ndelete2\ndelete3\ncommon';
    var text2 = 'insert1\ncommon';

    var diff = new SourceDiff.Diff(false);
    var result = diff.diff(text1, text2);

    var formatter = new SourceDiff.DiffFormatter(diff);

    var lines = formatter.lineUpText(text1, text2, result);

    assertEquals(4, lines[0].length);
    assertEquals(4, lines[1].length);
    assertEquals('insert1', lines[1][0]);
    assertEquals(' ', lines[1][1]);
    assertEquals(' ', lines[1][2]);
    assertEquals('common', lines[1][3]);
});

test("three deletes, two inserts, adds one lines to right", function() {
    var text1 = 'delete1\ndelete2\ndelete3\ncommon';
    var text2 = 'insert1\ninsert2\ncommon';

    var diff = new SourceDiff.Diff(false);
    var result = diff.diff(text1, text2);

    var formatter = new SourceDiff.DiffFormatter(diff);

    var lines = formatter.lineUpText(text1, text2, result);

    assertEquals(4, lines[0].length);
    assertEquals(4, lines[1].length);
    assertEquals('insert1', lines[1][0]);
    assertEquals('insert2', lines[1][1]);
    assertEquals(' ', lines[1][2]);
    assertEquals('common', lines[1][3]);
});

test("new blank line is considered an insert", function() {
    var text1 = 'common';
    var text2 = '\ncommon';

    var diff = new SourceDiff.Diff(false);
    var results = diff.diff(text1, text2);

    var formatter = new SourceDiff.DiffFormatter(diff);

    var lines = formatter.lineUpText(text1, text2, results);

    assertEquals(2, lines[0].length);
    assertEquals(2, lines[1].length);
    assertEquals(' ', lines[0][0]);
    assertEquals('common', lines[0][1]);
    assertEquals(' ', lines[1][0]);
    assertEquals('common', lines[1][1]);
});

test("deleted blank line is considered a delete", function() {
    var text1 = '\ncommon';
    var text2 = 'common';

    var diff = new SourceDiff.Diff(false);
    var results = diff.diff(text1, text2);

    var formatter = new SourceDiff.DiffFormatter(diff);

    var lines = formatter.lineUpText(text1, text2, results);

    assertEquals(2, lines[0].length);
    assertEquals(2, lines[1].length);
    assertEquals(' ', lines[0][0]);
    assertEquals('common', lines[0][1]);
    assertEquals(' ', lines[1][0]);
    assertEquals('common', lines[1][1]);
});

test("lined up correctly", function() {
    var text1 = 'a\nL1';
    var text2 = 'R1\na\nR2';

    var diff = new SourceDiff.Diff(false);
    var results = diff.diff(text1, text2);

    var formatter = new SourceDiff.DiffFormatter(diff);

    var lines = formatter.lineUpText(text1, text2, results);

    assertEquals(3, lines[0].length);
    assertEquals(3, lines[1].length);
    assertEquals(' ', lines[0][0]);
    assertEquals('a', lines[0][1]);
    assertEquals('L1', lines[0][2]);
    assertEquals('R1', lines[1][0]);
    assertEquals('a', lines[1][1]);
    assertEquals('R2', lines[1][2]);
});

test("lined up correctly 2", function() {
    var text1 = 'L\ncommon';
    var text2 = 'common\nR';

    var diff = new SourceDiff.Diff(false);
    var results = diff.diff(text1, text2);

    var formatter = new SourceDiff.DiffFormatter(diff);

    var lines = formatter.lineUpText(text1, text2, results);

    assertEquals(3, lines[0].length);
    assertEquals(3, lines[1].length);
    assertEquals('L', lines[0][0]);
    assertEquals('common', lines[0][1]);
    assertEquals(' ', lines[0][2]);
    assertEquals(' ', lines[1][0]);
    assertEquals('common', lines[1][1]);
    assertEquals('R', lines[1][2]);
});

test("lined up correctly with two edit runs", function() {
    var text1 = 'L\ncommon\ncommon2\nL2';
    var text2 = 'common\nR\ncommon2';

    var diff = new SourceDiff.Diff(false);
    var results = diff.diff(text1, text2);

    var formatter = new SourceDiff.DiffFormatter(diff);

    var lines = formatter.lineUpText(text1, text2, results);

    assertEquals(5, lines[0].length);
    assertEquals(5, lines[1].length);
    assertEquals('L', lines[0][0]);
    assertEquals('common', lines[0][1]);
    assertEquals(' ', lines[0][2]);
    assertEquals('common2', lines[0][3]);
    assertEquals('L2', lines[0][4]);
    assertEquals(' ', lines[1][0]);
    assertEquals('common', lines[1][1]);
    assertEquals('R', lines[1][2]);
    assertEquals('common2', lines[1][3]);
    assertEquals(' ', lines[1][4]);
});

test("Padding is added when one text is just a space", function() {
    var text1 = ' ';
    var text2 = '\n';

    var diff = new SourceDiff.Diff(true);
    var results = diff.diff(text1, text2);

    var formatter = new SourceDiff.DiffFormatter(diff);

    var lines = formatter.lineUpText(text1, text2, results);

    assertEquals(2, lines[0].length);
    assertEquals(2, lines[1].length);
    assertEquals(' ', lines[0][0]);
    assertEquals(' ', lines[0][1]);
    assertEquals(' ', lines[1][0]);
    assertEquals(' ', lines[1][1]);
});

test("formatLeftText: hello2 to hl2", function() {
    var diff = new SourceDiff.Diff(false);

    var results = {added: [], deleted: []};

    var formatter = new SourceDiff.DiffFormatter(diff);

    var deletedText = formatter.formatLeftText(results, ['hello2'], [{line: 0, results: {deleted: [{char: 1, text: 'el'}, {char: 4, text: 'o'}]}}]);

    assertEquals('<span class=\"modified\">h<span class=\"modified-light\">el</span>l<span class=\"modified-light\">o</span>2</span><br>', deletedText);
});