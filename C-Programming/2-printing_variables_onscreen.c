#include <stdio.h>

/* main - Program that prints variables 
 * as is onscreen
 * Use of format specifiers included
 * Return: 0
 */

int main(void)
{
	int a = 10;
	int b = 20;
	int c = a + b;
	float d = 20.5;


	printf("%d\n", c);
	printf("The value of c: %d\n", c);

	printf("%f\n", d);
	printf("The value of d: %f\n", d);
	
	return (0);
}
