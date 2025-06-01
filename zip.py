# Zip this project, ignoring the node_modules folder
# and the .git folder
import os
import zipfile

def zip_project( project_path, zip_name ):
	# Create a zip file
	with zipfile.ZipFile( zip_name, 'w', zipfile.ZIP_DEFLATED ) as zipf:
		# Walk the directory tree
		for root, dirs, files in os.walk( project_path ):
			# Ignore node_modules and .git folders
			if 'node_modules' in dirs:
				dirs.remove('node_modules')
			if '.git' in dirs:
				dirs.remove('.git')
			# Add files to the zip file
			for file in files:
				if file.endswith('.zip') or file == '.env':
					continue
				# Ignore image files
				if file.lower().endswith((
					'.png', '.jpg', '.jpeg', '.webp', '.gif', '.bmp', '.svg', '.heic', '.tiff', '.ico', '.jfif', '.pjpeg', '.pjp', '.avif', '.apng', '.raw', '.eps', '.ai', '.pdf', '.indd', '.3fr', '.ari', '.srf', '.sr2', '.bay', '.crw', '.cr2', '.cap', '.dcs', '.dcr', '.drf', '.eip', '.erf', '.fff', '.iiq', '.k25', '.kdc', '.mdc', '.mef', '.mos', '.mrw', '.nef', '.nrw', '.obm', '.orf', '.pef', '.ptx', '.r3d', '.raf', '.raw', '.rwl', '.rw2', '.rwz', '.srw', '.x3f'
				)):
					continue
				file_path = os.path.join( root, file )
				arcname = os.path.relpath( file_path, start = project_path )
				zipf.write( file_path, arcname )

# Usage example
# zip_project( 'path/to/your/project', 'project.zip' )

if __name__ == '__main__':
	import sys

	default_path = os.path.dirname( os.path.abspath( __file__ ) )
	
	if len( sys.argv ) == 3:
		source = sys.argv[ 1 ]
		zip_name = sys.argv[ 2 ]
	elif len( sys.argv ) == 2:
		source = default_path
		zip_name = sys.argv[ 1 ]
	else:
		print( 'Usage: python zip.py <zip_name> [project_path]' )
		sys.exit( 1 )
	
	zip_project( source, zip_name )