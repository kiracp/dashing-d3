def main():
	# Ugly pace file with info on newlines
	input = open('pace.txt', 'r').readlines()

	#Output file
	output = open('pretty-pace.csv', 'w')

	count = 0
	
	# This will contain our csv row
	row = ""
	row_count = 0
	#Each input item is 15 lines
	#Our job is to break those lines up and determine which number contains which value
	for i in input:
		i = i.strip()
		# Day-month
		if (count%15 == 1): 
			row = ""
			i = i.split()
			row = str(row_count) + "," + i[0]+"-"+i[1]
		#Year
		if (count%15 == 2): 
			row = row + "-" + i
		#Dist
		if (count%15 == 5): 
			i = i.split()
			row = row + "," + i[0]
		#Time
		if (count%15 == 7): 
			row = row + "," + i
		#Pace
		if (count%15 == 9): 
			i = i.split()

			row = row + "," + i[0] + "\n"
			#print row
			row_count = row_count + 1
			output.write(row)

		count=count+1
	
main()
