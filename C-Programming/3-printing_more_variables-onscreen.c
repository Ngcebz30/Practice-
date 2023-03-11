#include <stdio.h>

/* main - Printing more variables
* with more data types onscreen
* Return: 0
*/

int main(void)
{
	float a = 15.10;
	float b = 25.30;
	float c = 48.92;
	double d = a + b + c;

	printf("Salary_1: %f \n", a);
	printf("Salary_2: %f \n", b);
	printf("Salary_3: %f \n", c);
	printf("The sum of all the salaries combined: %f\n", d);

	return (0);
}
