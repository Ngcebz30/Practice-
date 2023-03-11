#include <stdio.h>

/* main - Program that prints loops
 * the code in the loop will run, over and over again
 * as long as a variable (i) is less than
 * Return: 0
 */

int main(void)
{
	// While loop here
	
	int a = 0;

	while (a < 5)
	{
		printf("%d\n", a);
		a++;
	}

	return (0);
}
