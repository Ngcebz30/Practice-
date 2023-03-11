#include <stdio.h>
#include <stdbool.h>

/* main - Program that deals with 
 * boolean (true or false) expressions
 * Return: 0
 */

int main(void)
{
	// Boolean expression here 
	
	bool isTheSkyBlue = true;
	bool isTheSunPink = false;

	printf("%d\n", isTheSkyBlue);
	printf("%d\n", isTheSunPink);



	// iF Statement here
	
	int myAge = 25;
	int votingAge = 18;

	if (myAge >= votingAge)
 	{
	       	printf("Old enough to vote!\n");
	}


	else
	{
  		printf("Not old enough to vote.\n");
	}


	return (0);
}
