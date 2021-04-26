import re

def pre_mutation(context):
    if re.match('user/handler.py',context.filename) or context.filename == 'api/__init__.py' or context.filename == 'category/handler.py':
        context.skip = True
    line = context.current_source_line.strip()
    if line.startswith('@'):
        context.skip = True
