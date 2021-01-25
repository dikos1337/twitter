import random
import string


def random_string_generator(size=10,
                            chars=string.ascii_lowercase +
                            string.ascii_uppercase + string.digits):

    return ''.join(random.choice(chars) for _ in range(size))


def slug_save(obj):
    """ A function to generate a slug and see if it has been used."""
    if not obj.slug:  # if there isn't a slug
        obj.slug = random_string_generator(10)  # create one
        slug_is_wrong = True
        while slug_is_wrong:  # keep checking until we have a valid slug
            slug_is_wrong = False
            other_objs_with_slug = type(obj).objects.filter(slug=obj.slug)
            if len(other_objs_with_slug) > 0:
                # if any other objects have current slug
                slug_is_wrong = True
            if slug_is_wrong:
                # create another slug and check it again
                obj.slug = random_string_generator(10)
