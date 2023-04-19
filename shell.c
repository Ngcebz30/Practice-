#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/wait.h>

#define BUFFER_SIZE 1024

int main(void) {
    char buffer[BUFFER_SIZE];
    char *args[2];
	extern char **environ;
    int status;

    while (1) {
        printf("$ "); // display the prompt
        if (fgets(buffer, BUFFER_SIZE, stdin) == NULL) { // handle end of file
            printf("\n");
            break;
        }
        buffer[strcspn(buffer, "\n")] = '\0'; // remove trailing newline character
        args[0] = buffer;
        args[1] = NULL;
        pid_t pid = fork(); // create a child process
        if (pid == -1) {
            perror("fork");
            return 1;
        } else if (pid == 0) {
            execve(args[0], args, environ); // execute the command
            perror("execve");
            return 1;
        }
        waitpid(pid, &status, 0); // wait for the child process to finish
    }

    return 0;
}

