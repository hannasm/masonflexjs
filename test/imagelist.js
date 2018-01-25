(function() {
  window.test_images = [
    'https://images.unsplash.com/photo-1458471725208-236f89d4709c',
    'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a',
    'https://images.unsplash.com/photo-1494028960909-2321fad2a785',
    'https://images.unsplash.com/photo-1493807394496-2d6d8a70dc5f',
    'https://images.unsplash.com/photo-1484242780561-6aff8688c36a',
    'https://images.unsplash.com/photo-1483008536848-ab0f7f3b42e2',
    'https://images.unsplash.com/photo-1444505465537-42c1e519902b',
    'https://images.unsplash.com/photo-1488724204964-0c255174eb01',
    'https://images.unsplash.com/photo-1498262257252-c282316270bc',
    'https://images.unsplash.com/photo-1490821957118-4ae460b4f52b',
    'https://images.unsplash.com/photo-1486551937199-baf066858de7',
    'https://images.unsplash.com/photo-1481026469463-66327c86e544',
    'https://images.unsplash.com/photo-1443160387162-4a11b1bb3cb7',
    'https://images.unsplash.com/photo-1476888836370-f58a63db75ad',
    'https://images.unsplash.com/photo-1494506132334-19732cd53b32',
    'https://images.unsplash.com/photo-1494660084187-79afc14b7c0c',
    'https://images.unsplash.com/photo-1489590114500-c766c622daf2',
    'https://images.unsplash.com/photo-1500186629774-92ff4e8eddc2',
    'https://images.unsplash.com/photo-1422284763110-6d0edd657b13',
    'https://images.unsplash.com/photo-1487094051416-0d5a8cee84db',
    'https://images.unsplash.com/photo-1482864378975-b091e8e62339',
    'https://images.unsplash.com/photo-1497005367839-6e852de72767',
    'https://images.unsplash.com/photo-1491186751821-59a0a1bd73f1',
    'https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18'
  ];
  window.error_images=[];
  for (var i = 0;  i < window.test_images.length; i++) {
    window.error_images.push(window.test_images[i].replace('images', 'doesnotexist'));
  }
  window.test_image_suffixes = {
    'small': '?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&s=f82c1b2283e2d580a6dc4fb3705b2c79',
    'thumb': '?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=30eb50a990275971a8e9f9e2c7b87764',
    'regular': '?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=feccda0a0a589cf0b24ec143095d0216',
    'full': '?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&s=2e1e98c6d421d86b27c2fcc0f39f4abd'
  };

  window.test_images_cite = 'https://unsplash.com/collections/1110512/mason';

  window.quotes = [["Less is More", "Ludwig Mies Van Der Rohe"],
              ["God is in the Details", "Ludwig Mies Van Der Rohe"],
              ["Architecture starts when you carefully put two bricks together. There it begins", "Ludwig Mies Van Der Rohe"],
              ["Good building come from good people and all problems are solved by good design", "Stephen Gardiner"],
              ["There are 360 degrees, so why stick to one?", "Zaha Hadid"],
              ["Form ever follows function", "Louis Sullivan"],
              ["Recognizing the need is the primary condition of design", "Charles Eames"],
              ["Architecture is the learned game, correct and magnificent, of forms assembled in the light", "Le Corbusier"],
              ["An idea is salvation by imagination", "Frank Lloyd Wright"],
              ["When I'm working on a problem, I never think about beauty. But when I've finished, if the solution is not beautiful I know it's wrong", "Buckminster Fuller"],
              ["As an architect you design for the present, with an awareness of the past, for a future which is essentially unknown", "Norman Foster"],
              ["To provide meaningful architecture is not to parody history but to articulate it", "Daniel Libeskind"],
              ["To create, one must first question everything", "Eileen Gray"],
              ["One of the great beauties of architecture is that each time, it is like life starting all over again", "Renzo Piano"],
              ["You've got to bumble forward into the unknown", "Frank Gehry"]]; 
}
)();
