#include <stdio.h>

/* main - Program that prints
 * greetings depending on the time
 * Return: 0
 */

int main(void)
{
	int time = 12;

	if (time < 12)
	{
		printf("Good Morning\n");
	}

	else
	{
		printf("Good Afternoon\n");
	}

	return (0);
}
