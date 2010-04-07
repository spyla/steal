module("steal")

test("steal's domain()", function(){
     equals(null,new steal.File("file://C:/Development").domain(),"problems from file" )
     equals('something.com',new steal.File('http://something.com/asfdkl;a').domain(),"something.com is the correct http domain." )
     equals('127.0.0.1:3006',new steal.File('https://127.0.0.1:3006/asdf').domain(),"something.com is the correct https domain." )	
})

test("steal's joinFrom()", function(){
	var result = new steal.File('a/b.c').joinFrom('/d/e');
    equals(result, "/d/e/a/b.c", "/d/e/a/b.c is correctly joined.");
	
	result = new steal.File('a/b.c').joinFrom('d/e');
    equals(result, "d/e/a/b.c", "d/e/a/b.c is correctly joined.");	
	
	result = new steal.File('a/b.c').joinFrom('d/e/');
    equals(result, "d/e/a/b.c", "d/e/a/b.c is correctly joined.");	
	
	result = new steal.File('a/b.c').joinFrom('http://abc.com');
    equals(result, "http://abc.com/a/b.c", "http://abc.com/a/b.c is correctly joined.");	
	
	result = new steal.File('/a/b.c').joinFrom('http://abc.com');
    equals(result, "http://abc.com/a/b.c", "http://abc.com/a/b.c is correctly joined.");		
	
	result = new steal.File('a/b.c').joinFrom('http://abc.com/');
    equals(result, "http://abc.com/a/b.c", "http://abc.com/a/b.c is correctly joined.");
	
	result = new steal.File('/a/b.c').joinFrom('http://abc.com/');
    equals(result, "http://abc.com/a/b.c", "http://abc.com/a/b.c is correctly joined.");		
	
	result = new steal.File('a/b.c').joinFrom('../d/e');
    equals(result, "../d/e/a/b.c", "../d/e/a/b.c is correctly joined.");		
})

test("steal's dir()", function(){
    equals("/a/b/c", new steal.File("/a/b/c/cookbook.html").dir(), "/a/b/c dir is correct.")	
    equals("a/b/c", new steal.File("a/b/c/cookbook.html").dir(), "a/b/c dir is correct.")
    equals("../a/b/c", new steal.File("../a/b/c/cookbook.html").dir(), "../a/b/c dir is correct.")
    equals("http://127.0.0.1:3007", new steal.File("http://127.0.0.1:3007/cookbook.html").dir(), "http://127.0.0.1:3007 dir is correct.")
})

test("steal's File.clean()", function(){
	result = new steal.File('http://abc.com#action').clean();
    equals(result, "http://abc.com", "http://abc.com#action is correctly cleaned.");
	
	result = new steal.File('http://abc.com#action&q=param').clean();
    equals(result, "http://abc.com", "http://abc.com#action&q=param is correctly cleaned.");
	
	result = new steal.File('http://abc.com/#action&q=param').clean();
    equals(result, "http://abc.com/", "http://abc.com/#action&q=param is correctly cleaned.");	
	
	result = new steal.File('a/b/#action&q=param').clean();
    equals(result, "a/b/", "a/b/#action&q=param is correctly cleaned.");	
	
	result = new steal.File('a/b#action&q=param').clean();
    equals(result, "a/b", "a/b#action&q=param is correctly cleaned.");	
})
